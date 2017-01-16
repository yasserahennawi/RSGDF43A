import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from 'graphql';
import fs from 'fs';
import path from 'path';
import IoC from 'AppIoC';
import configureKernel from '../server/kernel';

require('dotenv').config();
configureKernel();

const definitions = {};

/**
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString

  integer
  number
  string
  boolean

 */
function mapGraphQLTypeToSwaggerType(graphqlType) {
  if(graphqlType.name === 'String') {
    return "string";
  }
  if(graphqlType.name === 'Float') {
    return "number";
  }
  if(graphqlType.name === 'Int') {
    return "integer";
  }
  if(graphqlType.name === 'Boolean') {
    return "boolean";
  }

  // if(graphqlType instanceof GraphQLString) {
  //   return "string";
  // }
  // if(graphqlType instanceof GraphQLInt) {
  //   return "integer";
  // }
  // if(graphqlType instanceof GraphQLFloat) {
  //   return "number";
  // }
  // if(graphqlType instanceof GraphQLBoolean) {
  //   return "boolean";
  // }
  return `#/definitions/${graphqlType.name}`;
}

function documentGraphQLField(field) {
  return {
    type: mapGraphQLTypeToSwaggerType(fields[key].type),
    description: fields[key].description,
  };
}

async function documentGraphQLType(objectType) {
  const fields = objectType.getFields();

  const definition = {
    type: "object",
    properties: {},
  };

  for(let key in fields) {
    definition.properties[key] = documentGraphQLField(fields[key]);
  }

  definitions[objectType.name] = definition;
}

async function execute() {
  const userType = await IoC.resolve('userType');

  documentGraphQLType(userType);

  console.log(definitions.User.properties);
}

execute();
