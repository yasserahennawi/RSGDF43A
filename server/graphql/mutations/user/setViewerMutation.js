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

export const setViewerMutation = (authManager) => mutationWithClientMutationId({
  name: 'SetViewer',
  inputFields: {
    token: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    token: { type: GraphQLString },
  },
  mutateAndGetPayload: async ({ token }, context) => {
    // @TODO Support basic authentication here
    context.viewer = await authManager.getViewer(token);
    return { token };
  }
});

IoC.callable('setViewerMutation', ['authManager'], setViewerMutation);
