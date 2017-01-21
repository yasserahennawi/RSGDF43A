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

export const removeMutation = (commandExecuter, removeInvoiceCommand, errorType) => mutationWithClientMutationId({
  name: 'RemoveInvoice',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    deleted: { type: GraphQLBoolean },
    id: { type: GraphQLString },
  },
  mutateAndGetPayload: async ({ id }, { viewer }) => {
    const result = await commandExecuter.execute(removeInvoiceCommand, viewer, id);
    return { id: result._id, deleted: true };
  }
});

IoC.callable('removeInvoiceMutation', ['commandExecuter', 'removeInvoiceCommand', 'errorType'], removeMutation);
