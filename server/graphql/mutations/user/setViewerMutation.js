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
  mutationWithClientMutationId,
} from 'graphql-relay';

import IoC from 'AppIoC';

export const setViewerMutation = (authManager, userType, commandExecuter, loginUserCommand) => mutationWithClientMutationId({
  name: 'SetViewer',
  inputFields: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    token: { type: GraphQLString },
  },
  outputFields: {
    viewer: { type: userType },
  },
  mutateAndGetPayload: async ({ token, email, password }, context) => {
    // By default the viewer is the guest user.
    const guestUser = context.viewer;
    try {
      if(email && password) {
        const { viewer } = await commandExecuter.execute(loginUserCommand, guestUser, email, password);
        context.viewer = viewer;
        return { viewer };
      } else {
        context.viewer = await authManager.getViewer(token);
        return { viewer };
      }
    } catch(error) {
      // Dont fail if authentication failed, instead return a guest user.
      return { viewer: guestUser };
    }
  }
});

IoC.callable('setViewerMutation', ['authManager', 'userType', 'commandExecuter', 'loginUserCommand'], setViewerMutation);
