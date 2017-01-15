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

export const updateMutation = (commandExecuter, updateInvoiceCommand, invoiceType, errorType) => mutationWithClientMutationId({
  name: 'UpdateInvoice',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    invoice: { type: invoiceType },
    error: { type: errorType },
  },
  mutateAndGetPayload: async ({id, ...attrs}, { viewer }) => {
    try {
      const invoice = await commandExecuter.execute(updateInvoiceCommand, viewer, id, attrs);
      return { invoice };
    } catch(e) {
      return { error: e.toObject() };
    }
  }
});

IoC.callable('updateInvoiceMutation', ['commandExecuter', 'updateInvoiceCommand', 'invoiceType', 'errorType'], updateMutation);
