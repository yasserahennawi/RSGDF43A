/* eslint-disable no-console */
import path from 'path';
import fs from 'fs';
import { graphql } from 'graphql';
import chalk from 'chalk';
import { introspectionQuery, printSchema } from 'graphql/utilities';
import configureKernel from '../server/kernel';

const jsonFile = path.join(__dirname, '../server/graphql/__generated/schema.json');
const graphQLFile = path.join(__dirname, '../server/graphql/__generated/schema.graphql');

async function updateSchema(schema) {
  try {
    const json = await graphql(schema, introspectionQuery);
    fs.writeFileSync(jsonFile, JSON.stringify(json, null, 2));
    fs.writeFileSync(graphQLFile, printSchema(schema));
    console.log(chalk.green('Schema has been regenerated'));
  } catch (err) {
    console.error(chalk.red(err.stack));
  }
}

export default configureKernel({
  // We dont need a secret key to generate our schema
  secretKey: 'dummysecretkey',
}).then(kernel => {
  const schema = kernel.graphql.schema;
  // Run the function directly, if it's called from the command line
  if (!module.parent) updateSchema(schema);
  //
  return () => updateSchema(schema);
});
