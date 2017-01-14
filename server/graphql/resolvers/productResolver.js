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

export const productResolver = (productRepository, productsConnectionType) => {
  return {
    type: productsConnectionType,
    args: {
      // Relay search args
      ...connectionArgs,
      // Our custom search criteria goes here
      year: {type: GraphQLInt},
      month: {type: GraphQLInt},
      day: {type: GraphQLInt},
      creator: {type: GraphQLInt},
      mine: {type: GraphQLBoolean},
    },
    resolve: (viewer, { year, month, day, creator, mine, ...args }) => connectionFromPromisedArray(
      productRepository.find(viewer, { year, month, day, creator, mine }),
      args
    ),
  }
}

IoC.callable('productResolver', ['productRepository', 'productsConnectionType'], productResolver);
