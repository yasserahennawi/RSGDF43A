import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInputObjectType
} from 'graphql';

import {
  mutationWithClientMutationId,
  fromGlobalId,
} from 'graphql-relay';

import {
  getActualId,
  getActualIds,
} from 'utils/graphql';

import IoC from 'AppIoC';

export const updateMutation = (
  commandExecuter,
  updateRecipeCommand,
  imageInput,
  recipeItemInput,
  recipeType
) => mutationWithClientMutationId({
  name: 'UpdateRecipe',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    // Nutrition id
    nutrition: { type: new GraphQLNonNull(GraphQLString) },
    // Nutrition id
    orientation: { type: new GraphQLNonNull(GraphQLString) },
    //
    preparationTimeMin: { type: GraphQLInt },
    preparationInstructions: { type: new GraphQLList(GraphQLString) },
    difficulity: { type: new GraphQLNonNull(GraphQLInt) },
    calories: { type: new GraphQLNonNull(GraphQLFloat) },
    product: { type: new GraphQLNonNull(GraphQLString) },

    // mealType: { type: new GraphQLNonNull(GraphQLString) },
    items: { type: new GraphQLList(recipeItemInput) },
  },
  outputFields: {
    recipe: { type: recipeType },
  },
  mutateAndGetPayload: async (input, { viewer }) => {
    let attrs = {
      name: input.name,
      nutrition: getActualId(input.nutrition),
      orientation: getActualId(input.orientation),
      product: getActualId(input.product),
      preparationTimeMin: input.preparationTimeMin,
      preparationInstructions: input.preparationInstructions,
      difficulity: input.difficulity,
      calories: input.calories,
      // mealType: input.mealType,
      items: input.items.map(item => ({
        ingredient: getActualId(item.ingredient),
        quantity: item.quantity,
        unit: item.unit,
      })),
    };

    console.log("update recipe mutation", attrs);

    const recipe = await commandExecuter.execute(updateRecipeCommand, viewer, getActualId(input.id), attrs);
    return { recipe };
  }
});

IoC.callable('updateRecipeMutation', [
  'commandExecuter',
  'updateRecipeCommand',
  'imageInput',
  'recipeItemInput',
  'recipeType',
], updateMutation);
