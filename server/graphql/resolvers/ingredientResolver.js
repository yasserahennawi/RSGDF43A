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

import {
  connectionDefinitions,
  connectionArgs,
  connectionFromPromisedArray,
} from 'graphql-relay';

import IoC from 'AppIoC';

export const ingredientResolver = (ingredientRepository, ingredientsConnectionType) => {
  return {
    type: ingredientsConnectionType,
    args: {
      // Relay search args
      ...connectionArgs,
      // Our custom search criteria goes here
      name: {type: GraphQLString},
    },
    resolve: (viewer, { name, ...args }) => connectionFromPromisedArray(
      ingredientRepository.find(viewer, { name }),
      args
    ),
  }
}

IoC.callable('ingredientResolver', ['ingredientRepository', 'ingredientsConnectionType'], ingredientResolver);
