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

const recipeItemInput = new GraphQLInputObjectType({
  name: 'recipeItemInput',
  fields: () => ({
    ingredient: {type: new GraphQLNonNull(GraphQLString)},
    quantity: {type: GraphQLInt},
    unit: {type: new GraphQLNonNull(GraphQLString)},
  })
});

export const createMutation = (
  commandExecuter,
  createRecipeCommand,
  imageInput,
  recipeType
) => mutationWithClientMutationId({
  name: 'CreateRecipe',
  inputFields: {
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
    // items: { type: recipeItemInput },
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
      // items: input.items,
    };

    const recipe = await commandExecuter.execute(createRecipeCommand, viewer, attrs);
    return { recipe };
  }
});

IoC.callable('createRecipeMutation', [
  'commandExecuter',
  'createRecipeCommand',
  'imageInput',
  'recipeType',
], createMutation);
