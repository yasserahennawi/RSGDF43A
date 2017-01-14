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

export const updateUserMutation = (commandExecuter, command, userType, errorType) => mutationWithClientMutationId({
  name: 'UpdateUser',
  inputFields: {
    email: { type: new GraphQLNonNull(GraphQLString) },
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
      const user = await commandExecuter.execute(command, viewer, attrs);
      return { user };
    } catch(e) {
      return { error: e.toObject() };
    }
  }
});

IoC.callable('updateUserMutation', ['commandExecuter', 'updateUserCommand', 'userType', 'errorType'], updateUserMutation);

