/* eslint-disable no-console, no-shadow */
import path from 'path';
import webpack from 'webpack';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import WebpackDevServer from 'webpack-dev-server';
import historyApiFallback from 'connect-history-api-fallback';
import chalk from 'chalk';
import configureKernel from './kernel';
// Load dotenv env. variables
require('dotenv').config();

function runRelayDevServer(kernel) {
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


const addGuestViewerMiddleware = (kernel) => (req, res, next) => {
  req.viewer = kernel.defaults.guestViewer;
  next();
}

function runGraphQLDevServer(kernel) {
  // Launch GraphQL
  const graphql = express();
  // Middleware to set guest viewer
  graphql.use(addGuestViewerMiddleware(kernel));
  graphql.use('/', graphQLHTTP({
    graphiql: true,
    pretty: true,
    schema: kernel.graphql.schema,
    formatError: kernel.graphql.formatError,
  }));
  graphql.listen(process.env.GRAPHQL_PORT, () => console.log(chalk.green(`GraphQL is listening on port ${process.env.GRAPHQL_PORT}`)));
}

function runProductionServer(kernel) {
  // Launch Relay by creating a normal express server
  const relayServer = express();
  relayServer.use(historyApiFallback());
  // Middleware to set guest viewer
  graphql.use(addGuestViewerMiddleware(kernel));
  relayServer.use('/', express.static(path.join(__dirname, '../build')));
  relayServer.use('/graphql', graphQLHTTP({
    schema: kernel.graphql.schema,
    context: kernel.graphql.context,
    formatError: kernel.graphql.formatError,
  }));
  relayServer.listen(process.env.PORT, () => console.log(chalk.green(`Relay is listening on port ${process.env.PORT}`)));
}


// Configure kernel and start the application
configureKernel({
  secretKey: process.env.SECRET_KEY,
})
.then(kernel => {
  // If it's a development env.
  if (process.env.NODE_ENV === 'development') {
    runGraphQLDevServer(kernel);
    // runRelayDevServer(kernel);
  }

  else if (process.env.NODE_ENV === 'production') {
    runProductionServer(kernel);
  }
});

