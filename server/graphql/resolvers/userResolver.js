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
      email: {type: GraphQLString},
      // @TODO return this to a GraphQLList once this issue is resolved
      // https://github.com/relay-tools/react-router-relay/issues/218
      userTypes: {type: GraphQLString},
    },
    resolve: (parent, { name, userTypes, ...args }, { viewer }) => {
      return connectionFromPromisedArray(
        userRepository.find(viewer, { name, userTypes: userTypes.split(',') }),
        args
      )
    },
  }
}

IoC.callable('userResolver', ['userRepository', 'usersConnectionType'], userResolver);
