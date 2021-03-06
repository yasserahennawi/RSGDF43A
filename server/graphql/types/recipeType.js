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
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray,
  globalIdField,
} from 'graphql-relay';

import IoC from 'AppIoC';

// This will be only used here and no need to export it
const getRecipeItemType = (ingredientType) => new GraphQLObjectType({
  name: 'RecipeItem',
  fields: () => ({
    addition: { type: GraphQLString },
    ingredient: { type: new GraphQLNonNull(ingredientType) },
    quantity: { type: new GraphQLNonNull(GraphQLFloat) },
    unit: { type: new GraphQLNonNull(GraphQLString) },
  })
});

export const recipeType = (
  recipeModel,
  nodeInterface,
  imageType,
  userType,
  nutritionType,
  ingredientType,
  orientationType
) => {
  const recipeItemType = getRecipeItemType(ingredientType);
  const recipeItemsConnectionType = connectionDefinitions({
    nodeType: recipeItemType
  }).connectionType;
  const recipeType = new GraphQLObjectType({
    name: 'Recipe',
    fields: () => ({
      id: globalIdField('Recipe'),
      name: { type: new GraphQLNonNull(GraphQLString) },
      number: { type: new GraphQLNonNull(GraphQLInt) },
      preparationInstructions: { type: new GraphQLList(GraphQLString) },
      preparationTimeMin: { type: GraphQLInt },
      calories: { type: GraphQLFloat },
      difficulity: { type: GraphQLInt },
      coverImage: { type: imageType },
      // One of dinner, breakfast, launch
      mealType: { type: GraphQLString },
      orientation: {
        type: orientationType,
        resolve: recipe => recipe.getOrientation(),
      },
      nutrition: {
        type: nutritionType,
        resolve: recipe => recipe.getNutrition(),
      },

      // We cant here depend on the product type because the product already depends on us...
      // product: {
      //   type: new GraphQLNonNull(productType),
      //   resolve: recipe => recipe.getProduct(),
      // },
      items: {
        type: recipeItemsConnectionType,
        args: connectionArgs,
        resolve: (recipe, args) => connectionFromPromisedArray(
          recipe.getItems(),
          args
        ),
      },
      creator: {
        type: new GraphQLNonNull(userType),
        resolve: recipe => recipe.getCreator(),
      },
    }),
    interfaces: [nodeInterface],
    isTypeOf: obj => obj instanceof recipeModel,
  });
  return recipeType;
}

IoC.callable('recipeType', [
  'recipeModel',
  'nodeInterface',
  'imageType',
  'userType',
  'nutritionType',
  'ingredientType',
  'orientationType',
], recipeType);
