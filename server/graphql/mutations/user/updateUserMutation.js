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
  fromGlobalId,
} from 'graphql-relay';

import IoC from 'AppIoC';

export const updateUserMutation = (commandExecuter, command, userType, errorType) => mutationWithClientMutationId({
  name: 'UpdateUser',
  inputFields: {
    id: { type: GraphQLString },
    email: { type: GraphQLString },
    company: { type: GraphQLString },
    userType: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    nickName: { type: GraphQLString },
    password: { type: GraphQLString },
    oldPassword: { type: GraphQLString },
    addressStreet: { type: GraphQLString },
    addressStreetNumber: { type: GraphQLString },
    addressComplement: { type: GraphQLString },
    addressZip: { type: GraphQLString },
    addressCountry: { type: GraphQLString },
    addressCity: { type: GraphQLString },
  },
  outputFields: {
    user: { type: userType },
  },
  mutateAndGetPayload: async (attrs, { viewer }) => {
    const { id } = fromGlobalId(attrs.id);
    const user = await commandExecuter.execute(command, viewer, id, attrs);
    return { user };
  }
});

IoC.callable('updateUserMutation', ['commandExecuter', 'updateUserCommand', 'userType', 'errorType'], updateUserMutation);

