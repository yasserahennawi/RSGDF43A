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
  const server = express();
  //
  server.use(bodyParser.json());
  server.use(cors());
  // Middleware to set guest viewer
  server.use(addGuestViewerMiddleware);
  server.use(restApiRouter);
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
  const relayServer = express();
  relayServer.use(bodyParser.json());
  relayServer.use(cors());
  relayServer.use(historyApiFallback());
  // Middleware to set guest viewer
  relayServer.use(addGuestViewerMiddleware);
  relayServer.use('/', express.static(path.join(__dirname, '../build')));
  relayServer.use(restApiRouter);
  relayServer.use('/graphql', graphQLHTTP({
    schema: graphqlSchema,
    // formatError: formatError,
  }));
  relayServer.listen(process.env.PORT, () => console.log(chalk.green(`Relay is listening on port ${process.env.PORT}`)));
}

