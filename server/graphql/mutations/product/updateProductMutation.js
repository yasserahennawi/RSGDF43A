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

export const updateMutation = (commandExecuter, updateProductCommand, productType, errorType) => mutationWithClientMutationId({
  name: 'UpdateProduct',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    product: { type: productType },
  },
  mutateAndGetPayload: async ({id, ...attrs}, { viewer }) => {
    const product = await commandExecuter.execute(updateProductCommand, viewer, id, attrs);
    return { product };
  }
});

IoC.callable('updateProductMutation', ['commandExecuter', 'updateProductCommand', 'productType', 'errorType'], updateMutation);
