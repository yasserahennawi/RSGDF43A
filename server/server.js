/* eslint-disable no-console, no-shadow */
import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import WebpackDevServer from 'webpack-dev-server';
import historyApiFallback from 'connect-history-api-fallback';
import chalk from 'chalk';
import IoC from 'AppIoC';
import bodyParser from 'body-parser';
import cors from 'cors';

export async function runRelayDevServer() {
  // Launch Relay by using webpack.config.js
  const webpackConfig = require('../webpack.config');
  const relayServer = new WebpackDevServer(webpack(webpackConfig), {
    contentBase: '/build/',
    proxy: {
      '/graphql': `http://localhost:${process.env.GRAPHQL_PORT}`
    },
    stats: {
      colors: true,
      chunks:false
    },
    hot: true,
    historyApiFallback: true
  });

  // Serve static resources
  relayServer.use('/', express.static(path.join(__dirname, '../build')));
  relayServer.listen(process.env.PORT, () => console.log(chalk.green(`Relay is listening on port ${process.env.PORT}`)));
}

export async function runGraphQLDevServer() {
  const graphqlSchema = await IoC.resolve('graphqlSchema');
  const restApiRouter = await IoC.resolve('apiRouter');
  // Launch GraphQL
  const server = configureExpressServer(express());
  await addAuthMiddleware(server);
  addSeedRoute(server);
  // Middleware to set guest viewer
  server.use('/api/v1', restApiRouter);
  server.use('/graphql', graphQLHTTP({
    graphiql: true,
    pretty: true,
    schema: graphqlSchema,
    formatError: (error) => {
      console.log("heeeeeeeeeeere", error);
      return error.originalError ? error.originalError.toObject() : error.toObject();
    },
  }));
  await addErrorMiddleware(server);
  server.listen(process.env.GRAPHQL_PORT, () => console.log(chalk.green(`GraphQL is listening on port ${process.env.GRAPHQL_PORT}`)));
}

export async function runProductionServer() {
  const graphqlSchema = await IoC.resolve('graphqlSchema');
  const restApiRouter = await IoC.resolve('apiRouter');
  // Launch Relay by creating a normal express server
  const relayServer = configureExpressServer(express());
  await addAuthMiddleware(server);
  addSeedRoute(server);
  // Middleware to set guest viewer
  relayServer.use('/api/v1', restApiRouter);
  relayServer.use('/graphql', graphQLHTTP({
    graphiql: true,
    pretty: true,
    schema: graphqlSchema,
    formatError: (error) => ({
      ...error.toObject(),
    }),
  }));
  relayServer.use('/', express.static(path.join(__dirname, '../build')));
  await addErrorMiddleware(server);
  relayServer.listen(process.env.PORT, () => console.log(chalk.green(`Relay is listening on port ${process.env.PORT}`)));
}

function configureExpressServer(server) {
  server.use(bodyParser.json());
  server.use(cors());
  return server;
}

async function addAuthMiddleware(server) {
  const authMiddleware = await IoC.resolve('authMiddleware');
  server.use(authMiddleware.setViewer.bind(authMiddleware));
}

async function addErrorMiddleware(server) {
  const errorMiddleware = await IoC.resolve('errorMiddleware');
  server.use(errorMiddleware.log.bind(errorMiddleware));
  server.use(errorMiddleware.response.bind(errorMiddleware));
}

function addSeedRoute(server) {
  // Must remove this in production
  server.get('/seed/:secretKey', (req, res, next) => {
    console.log("here");
    if(req.params.secretKey === process.env.SECRET_KEY) {
      console.log("Seeding database please wait");
      const seedDatabase = require('../scripts/seedDatabase').default;
      seedDatabase()
        .then(result => res.send('Hey!'))
        .then(null, next);
    } else {
      throw new Error("Not Found!");
    }
  });
}
