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

export const createMutation = (commandExecuter, createProductCommand, productType, errorType) => mutationWithClientMutationId({
  name: 'CreateProduct',
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    product: { type: productType },
    error: { type: errorType },
  },
  mutateAndGetPayload: async (attrs, { viewer }) => {
    try {
      const product = await commandExecuter.execute(createProductCommand, viewer, attrs);
      return { product };
    } catch(e) {
      return { error: e.toObject() };
    }
  }
});

IoC.callable('createProductMutation', ['commandExecuter', 'createProductCommand', 'productType', 'errorType'], createMutation);
