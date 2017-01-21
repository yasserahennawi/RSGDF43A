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
import ModelNotFoundError from 'errors/ModelNotFoundError';
import * as Q from 'q';

export const createMutation = (commandExecuter, createUserCommand, userType, errorType) => mutationWithClientMutationId({
  name: 'CreateUser',
  inputFields: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    userType: { type: new GraphQLNonNull(GraphQLString) },
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    nickName: { type: GraphQLString },
  },
  outputFields: {
    user: { type: userType },
    error: {type: errorType},
  },
  mutateAndGetPayload: async (attrs, { viewer }) => {
    const user = await commandExecuter.execute(createUserCommand, viewer, attrs);
    return { user };
  }
});

IoC.callable('createUserMutation', ['commandExecuter', 'createUserCommand', 'userType', 'errorType'], createMutation);
