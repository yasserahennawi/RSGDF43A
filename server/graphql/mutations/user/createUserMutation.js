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

export const createMutation = (commandExecuter, createUserCommand, userType, errorType) => mutationWithClientMutationId({
  name: 'CreateUser',
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    user: { type: userType },
    error: { type: errorType },
  },
  mutateAndGetPayload: async (attrs, { viewer }) => {
    try {
      const user = await commandExecuter.execute(createUserCommand, viewer, attrs);
      return { user };
    } catch(e) {
      return { error: e.toObject() };
    }
  }
});

IoC.callable('createUserMutation', ['commandExecuter', 'createUserCommand', 'userType', 'errorType'], createMutation);
