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

export const createMutation = (commandExecuter, createInvoiceCommand, invoiceType, errorType) => mutationWithClientMutationId({
  name: 'CreateInvoice',
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    invoice: { type: invoiceType },
  },
  mutateAndGetPayload: async (attrs, { viewer }) => {
    try {
      const invoice = await commandExecuter.execute(createInvoiceCommand, viewer, attrs);
      return { invoice };
    } catch(e) {
      return { error: e.toObject() };
    }
  }
});

IoC.callable('createInvoiceMutation', ['commandExecuter', 'createInvoiceCommand', 'invoiceType', 'errorType'], createMutation);
