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

export const updateMutation = (commandExecuter, updateRecipeCommand, recipeType, errorType) => mutationWithClientMutationId({
  name: 'UpdateRecipe',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    recipe: { type: recipeType },
    error: { type: errorType },
  },
  mutateAndGetPayload: async ({id, ...attrs}, { viewer }) => {
    try {
      const recipe = await commandExecuter.execute(updateRecipeCommand, viewer, id, attrs);
      return { recipe };
    } catch(e) {
      return { error: e.toObject() };
    }
  }
});

IoC.callable('updateRecipeMutation', ['commandExecuter', 'updateRecipeCommand', 'recipeType', 'errorType'], updateMutation);
