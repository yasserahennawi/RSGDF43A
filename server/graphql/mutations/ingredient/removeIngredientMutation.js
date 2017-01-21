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

export const removeMutation = (commandExecuter, removeIngredientCommand, errorType) => mutationWithClientMutationId({
  name: 'RemoveIngredient',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    deleted: { type: GraphQLBoolean },
    id: { type: GraphQLString },
  },
  mutateAndGetPayload: async ({ id }, { viewer }) => {
    const result = await commandExecuter.execute(removeIngredientCommand, viewer, id);
    return { id: result._id, deleted: true };
  }
});

IoC.callable('removeIngredientMutation', ['commandExecuter', 'removeIngredientCommand', 'errorType'], removeMutation);
