require("babel-core/register");
require("babel-polyfill");

import fs from 'fs';
import path from 'path';
import configureKernel from './kernel';
import {
  runGraphQLDevServer,
  runProductionServer,
} from './server';
import IoC from 'AppIoC';

// Load dotenv env. variables
if (fs.existsSync(path.join(process.cwd(), '.env'))) {
  require('dotenv').config();
}

configureKernel();

// Start the application
// If it's a development env.
if (process.env.NODE_ENV === 'development') {
  runGraphQLDevServer();
}

else if (process.env.NODE_ENV === 'production') {
  runProductionServer();
}
