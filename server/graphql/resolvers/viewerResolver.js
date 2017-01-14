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

export const viewerResolver = (
  commandExecuter,
  loginUserCommand,
  authManager,
  viewerType
) => ({
  type: viewerType,
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
        return viewer;
      } else {
        const viewer = await authManager.getViewer(token);
        return viewer;
      }
    } catch(error) {
      // Dont fail if authentication failed, instead return a guest user.
      return guestUser;
    }
  },
});

IoC.callable('viewerResolver', ['commandExecuter', 'loginUserCommand', 'authManager', 'viewerType'], viewerResolver);
