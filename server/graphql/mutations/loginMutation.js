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
  globalIdField,
} from 'graphql-relay';

import ForbiddenError from '../../errors/ForbiddenError';
import ValidationError from '../../errors/ValidationError';

export default (commandExecuter, loginUserCommand, userType, errorType) => mutationWithClientMutationId({
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
  mutateAndGetPayload: async ({ email, password }, { viewer }) => {
    try {
      return await commandExecuter.execute(loginUserCommand, viewer, email, password);
    } catch(e) {
      if((e instanceof ForbiddenError)
      || (e instanceof ValidationError)) {
        return { error: e.toObject() };
      }
      // Unkown error
      throw e;
    }
  }
});

