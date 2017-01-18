/* eslint-disable no-console */
import path from 'path';
import fs from 'fs';
import { graphql } from 'graphql';
import chalk from 'chalk';
import { introspectionQuery, printSchema } from 'graphql/utilities';
import IoC from '../server/IoC';
import configureKernel from '../server/kernel';

// Load dotenv env. variables
if (fs.existsSync(path.join(process.cwd(), '.env'))) {
  require('dotenv').config();
}

configureKernel();

const jsonFile = path.join(__dirname, '../server/graphql/__generated/schema.json');
const graphQLFile = path.join(__dirname, '../server/graphql/__generated/schema.graphql');

async function updateSchema(schema) {
  try {
    const schema = await IoC.resolve('graphqlSchema');
    const json = await graphql(schema, introspectionQuery);
    fs.writeFileSync(jsonFile, JSON.stringify(json, null, 2));
    fs.writeFileSync(graphQLFile, printSchema(schema));
    console.log(chalk.green('Schema has been regenerated'));
    process.exit();
  } catch (err) {
    console.error(chalk.red(err.stack));
  }
}

// Run the function directly, if it's called from the command line
if (!module.parent) updateSchema();
//
export default updateSchema;
