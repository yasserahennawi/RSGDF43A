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
    error: { type: errorType },
  },
  mutateAndGetPayload: async (attrs, { viewer }) => {
    try {
      const recipe = await commandExecuter.execute(createRecipeCommand, viewer, attrs);
      return { recipe };
    } catch(e) {
      return { error: e.toObject() };
    }
  }
});

IoC.callable('createRecipeMutation', ['commandExecuter', 'createRecipeCommand', 'recipeType', 'errorType'], createMutation);
