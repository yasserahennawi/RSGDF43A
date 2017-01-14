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

export const recipeResolver = (recipeRepository, recipesConnectionType) => {
  return {
    type: recipesConnectionType,
    args: {
      // Relay search args
      ...connectionArgs,
      // Our custom search criteria goes here
      name: {type: GraphQLInt},
    },
    resolve: (viewer, { name, ...args }) => connectionFromPromisedArray(
      recipeRepository.find(viewer, { name }),
      args
    ),
  }
}

IoC.callable('recipeResolver', ['recipeRepository', 'recipesConnectionType'], recipeResolver);
