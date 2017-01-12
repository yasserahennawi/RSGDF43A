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

export default (commandExecuter, registerUserCommand, userType, errorType) => mutationWithClientMutationId({
  name: 'Register',
  inputFields: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    userType: { type: new GraphQLNonNull(GraphQLString) },
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    nickName: { type: GraphQLString },
    addressStreet: { type: GraphQLString },
    addressStreetNumber: { type: GraphQLString },
    addressComplement: { type: GraphQLString },
    addressZipcode: { type: GraphQLString },
    addressCountry: { type: GraphQLString },
  },
  outputFields: {
    user: { type: userType },
    error: { type: errorType },
  },
  mutateAndGetPayload: async (attrs, { viewer }) => {
    try {
      const user = await commandExecuter.execute(registerUserCommand, viewer, attrs);

      return { user };
    } catch(e) {
      return { error: e.toObject() };
    }
  }
});

