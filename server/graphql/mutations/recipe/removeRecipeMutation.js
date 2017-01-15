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

export const removeMutation = (commandExecuter, removeRecipeCommand, errorType) => mutationWithClientMutationId({
  name: 'RemoveRecipe',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    deleted: { type: GraphQLBoolean },
    id: { type: GraphQLString },
    error: { type: errorType },
  },
  mutateAndGetPayload: async ({ id }, { viewer }) => {
    try {
      const result = await commandExecuter.execute(removeRecipeCommand, viewer, id);
      return { id: result._id, deleted: true };
    } catch(e) {
      return { error: e.toObject(), deleted: false };
    }
  }
});

IoC.callable('removeRecipeMutation', ['commandExecuter', 'removeRecipeCommand', 'errorType'], removeMutation);
