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

export default authManager => mutationWithClientMutationId({
  name: 'SetViewer',
  inputFields: {
    token: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    token: { type: GraphQLString },
  },
  mutateAndGetPayload: async ({ token }, context) => {
    context.viewer = await authManager.getViewer(token);
    return { token };
  }
});

