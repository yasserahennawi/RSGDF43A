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
      colors: true
    },
    hot: true,
    historyApiFallback: true
  });

  // Serve static resources
  relayServer.use('/', express.static(path.join(__dirname, '../build')));
}

const addGuestViewerMiddleware = async (req, res, next) => {
  req.viewer = await IoC.resolve('guestUser');
  next();
}

export async function runGraphQLDevServer() {
  const graphqlSchema = await IoC.resolve('graphqlSchema');
  const restApiRouter = await IoC.resolve('apiRouter');
  // Launch GraphQL
  const server = configureExpressServer(express());
  // Middleware to set guest viewer
  server.use('/api/v1', restApiRouter);
  server.use('/', graphQLHTTP({
    graphiql: true,
    pretty: true,
    schema: graphqlSchema,
    // formatError: formatError,
  }));
  server.listen(process.env.GRAPHQL_PORT, () => console.log(chalk.green(`GraphQL is listening on port ${process.env.GRAPHQL_PORT}`)));
}

export async function runProductionServer() {
  const graphqlSchema = await IoC.resolve('graphqlSchema');
  const restApiRouter = await IoC.resolve('apiRouter');
  // Launch Relay by creating a normal express server
  const relayServer = configureExpressServer(express());
  // Middleware to set guest viewer
  relayServer.use('/api/v1', restApiRouter);
  relayServer.use('/graphql', graphQLHTTP({
    graphiql: true,
    pretty: true,
    schema: graphqlSchema,
    // formatError: formatError,
  }));
  relayServer.use('/', express.static(path.join(__dirname, '../build')));
  relayServer.listen(process.env.PORT, () => console.log(chalk.green(`Relay is listening on port ${process.env.PORT}`)));
}



function configureExpressServer(server) {
  server.use(bodyParser.json());
  server.use(cors());
  server.use(addGuestViewerMiddleware);
  addSeedRoute(server);
  return server;
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
