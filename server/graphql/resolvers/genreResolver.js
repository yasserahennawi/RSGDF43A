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

export const genreResolver = (genreRepository, genresConnectionType) => {
  return {
    type: genresConnectionType,
    args: {
      // Relay search args
      ...connectionArgs,
      // Our custom search criteria goes here
      name: {type: GraphQLString},
    },
    resolve: (viewer, { name, ...args }) => connectionFromPromisedArray(
      genreRepository.find(viewer, { name }),
      args
    ),
  }
}

IoC.callable('genreResolver', ['genreRepository', 'genresConnectionType'], genreResolver);
