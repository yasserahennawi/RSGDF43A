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

export const invoiceResolver = (invoiceRepository, invoicesConnectionType) => {
  return {
    type: invoicesConnectionType,
    args: {
      // Relay search args
      ...connectionArgs,
      // Our custom search criteria goes here
      creator: {type: GraphQLString},
    },
    resolve: (viewer, { creator, ...args }) => connectionFromPromisedArray(
      invoiceRepository.find(viewer, { creator }),
      args
    ),
  }
}

IoC.callable('invoiceResolver', ['invoiceRepository', 'invoicesConnectionType'], invoiceResolver);
