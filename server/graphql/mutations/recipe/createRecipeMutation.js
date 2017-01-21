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

export const createMutation = (commandExecuter, createRecipeCommand, recipeType, errorType) => mutationWithClientMutationId({
  name: 'CreateRecipe',
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    recipe: { type: recipeType },
  },
  mutateAndGetPayload: async (attrs, { viewer }) => {
    const recipe = await commandExecuter.execute(createRecipeCommand, viewer, attrs);
    return { recipe };
  }
});

IoC.callable('createRecipeMutation', ['commandExecuter', 'createRecipeCommand', 'recipeType', 'errorType'], createMutation);
