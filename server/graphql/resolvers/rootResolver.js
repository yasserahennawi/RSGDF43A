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

import IoC from 'AppIoC';

export const rootResolver = (
  commandExecuter,
  loginUserCommand,
  authManager,
  rootType
) => ({
  type: rootType,
  args: {
    // Our custom search criteria goes here
    token: {type: GraphQLString},

    // Basic authentication
    email: {type: GraphQLString},
    password: {type: GraphQLString},
  },
  resolve: async (root, { token, email, password }, { viewer: guestUser }) => {
    try {
      if(email && password) {
        const { viewer } = await commandExecuter.execute(loginUserCommand, guestUser, email, password);
        return { viewer };
      } else {
        const viewer = await authManager.getViewer(token);
        return { viewer };
      }
    } catch(error) {
      // Dont fail if authentication failed, instead return a guest user.
      return { viewer: guestUser };
    }
  },
});

IoC.callable('rootResolver', ['commandExecuter', 'loginUserCommand', 'authManager', 'rootType'], rootResolver);
