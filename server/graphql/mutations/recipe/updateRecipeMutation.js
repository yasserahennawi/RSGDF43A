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
  },
  mutateAndGetPayload: async ({id, ...attrs}, { viewer }) => {
    const recipe = await commandExecuter.execute(updateRecipeCommand, viewer, id, attrs);
    return { recipe };
  }
});

IoC.callable('updateRecipeMutation', ['commandExecuter', 'updateRecipeCommand', 'recipeType', 'errorType'], updateMutation);
