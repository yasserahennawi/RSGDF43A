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
  },
  mutateAndGetPayload: async (attrs, { viewer }) => {
    const product = await commandExecuter.execute(createProductCommand, viewer, attrs);
    return { product };
  }
});

IoC.callable('createProductMutation', ['commandExecuter', 'createProductCommand', 'productType', 'errorType'], createMutation);
