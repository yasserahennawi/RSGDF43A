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

export const loginMutation = (commandExecuter, command, userType, errorType) => mutationWithClientMutationId({
  name: 'Login',
  inputFields: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    token: { type: GraphQLString },
    viewer: { type: userType },
    error: { type: errorType },
  },
  mutateAndGetPayload: async ({ email, password }, context) => {
    // try {
      const { token, viewer } = await commandExecuter.execute(command, context.viewer, email, password);
      context.viewer = viewer;
      return { token, viewer };
    // } catch(e) {
    //   return { error: e.toObject(), viewer: context.viewer };
    // }
  }
});

IoC.callable('loginMutation', ['commandExecuter', 'loginUserCommand', 'userType', 'errorType'], loginMutation);
