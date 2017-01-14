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

export const orientationResolver = (orientationRepository, orientationsConnectionType) => {
  return {
    type: orientationsConnectionType,
    args: {
      // Relay search args
      ...connectionArgs,
      // Our custom search criteria goes here
      name: {type: GraphQLString},
    },
    resolve: (viewer, { name, ...args }) => connectionFromPromisedArray(
      orientationRepository.find(viewer, { name }),
      args
    ),
  }
}

IoC.callable('orientationResolver', ['orientationRepository', 'orientationsConnectionType'], orientationResolver);
