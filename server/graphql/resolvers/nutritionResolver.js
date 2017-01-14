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

export const nutritionResolver = (nutritionRepository, nutritionsConnectionType) => {
  return {
    type: nutritionsConnectionType,
    args: {
      // Relay search args
      ...connectionArgs,
      // Our custom search criteria goes here
      name: {type: GraphQLString},
    },
    resolve: (viewer, { name, ...args }) => connectionFromPromisedArray(
      nutritionRepository.find(viewer, { name }),
      args
    ),
  }
}

IoC.callable('nutritionResolver', ['nutritionRepository', 'nutritionsConnectionType'], nutritionResolver);
