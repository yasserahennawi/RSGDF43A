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

export const userResolver = (userRepository, usersConnectionType) => {
  return {
    type: usersConnectionType,
    args: {
      // Relay search args
      ...connectionArgs,
      // Our custom search criteria goes here
      name: {type: GraphQLInt},
    },
    resolve: (viewer, { name, ...args }) => connectionFromPromisedArray(
      userRepository.find(viewer, { name }),
      args
    ),
  }
}

IoC.callable('userResolver', ['userRepository', 'usersConnectionType'], userResolver);
