import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLSchema,
} from 'graphql';

import IoC from 'AppIoC';

export const graphqlSchema = (
  nodeField,
  loginMutation,
  registerMutation,
  createUserMutation,
  updateUserMutation,
  removeUserMutation,
  createGenreMutation,
  updateGenreMutation,
  removeGenreMutation,
  createIngredientMutation,
  updateIngredientMutation,
  removeIngredientMutation,
  createInvoiceMutation,
  updateInvoiceMutation,
  removeInvoiceMutation,
  createNutritionMutation,
  updateNutritionMutation,
  removeNutritionMutation,
  createOrientationMutation,
  updateOrientationMutation,
  removeOrientationMutation,
  createProductMutation,
  updateProductMutation,
  removeProductMutation,
  createRecipeMutation,
  updateRecipeMutation,
  removeRecipeMutation,
  genreResolver,
  ingredientResolver,
  invoiceResolver,
  nutritionResolver,
  orientationResolver,
  productResolver,
  recipeResolver,
  userResolver,
  userType
) => {

  /**
   * Construct schema (query and mutation)
   *
   * query: root query has only the viewer
   * mutation: all available mutations in our application
   */
  return new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: () => ({
        node: nodeField,
        viewer: {
          type: new GraphQLNonNull(userType),
          resolve: (parent, args, { viewer }) => viewer,
        },
        // All queries available to resolve
        genres: genreResolver,
        ingredients: ingredientResolver,
        invoices: invoiceResolver,
        nutritions: nutritionResolver,
        orientations: orientationResolver,
        products: productResolver,
        recipes: recipeResolver,
        users: userResolver,
      })
    }),
    mutation: new GraphQLObjectType({
      name: 'Mutation',
      fields: () => ({
        // Authentication mutations
        login: loginMutation,
        register: registerMutation,
        // User mutations
        createUser: createUserMutation,
        updateUser: updateUserMutation,
        removeUser: removeUserMutation,
        // Genre mutations
        createGenre: createGenreMutation,
        updateGenre: updateGenreMutation,
        removeGenre: removeGenreMutation,
        // Ingredient mutations
        createIngredient: createIngredientMutation,
        updateIngredient: updateIngredientMutation,
        removeIngredient: removeIngredientMutation,
        // Invoice mutations
        createInvoice: createInvoiceMutation,
        updateInvoice: updateInvoiceMutation,
        removeInvoice: removeInvoiceMutation,
        // Nutrition mutations
        createNutrition: createNutritionMutation,
        updateNutrition: updateNutritionMutation,
        removeNutrition: removeNutritionMutation,
        // Orientation mutations
        createOrientation: createOrientationMutation,
        updateOrientation: updateOrientationMutation,
        removeOrientation: removeOrientationMutation,
        // Product mutations
        createProduct: createProductMutation,
        updateProduct: updateProductMutation,
        removeProduct: removeProductMutation,
        // Recipe mutations
        createRecipe: createRecipeMutation,
        updateRecipe: updateRecipeMutation,
        removeRecipe: removeRecipeMutation,
      })
    }),
  });
}

IoC.callable('graphqlSchema', [
  'nodeField',

  // Authentication mutations
  'loginMutation',
  'registerMutation',

  // User mutations
  'createUserMutation',
  'updateUserMutation',
  'removeUserMutation',

  // Genre mutations
  'createGenreMutation',
  'updateGenreMutation',
  'removeGenreMutation',

  // Ingredient mutations
  'createIngredientMutation',
  'updateIngredientMutation',
  'removeIngredientMutation',

  // Invoice mutations
  'createInvoiceMutation',
  'updateInvoiceMutation',
  'removeInvoiceMutation',

  // Nutrition mutations
  'createNutritionMutation',
  'updateNutritionMutation',
  'removeNutritionMutation',

  // Orientation mutations
  'createOrientationMutation',
  'updateOrientationMutation',
  'removeOrientationMutation',

  // Product mutations
  'createProductMutation',
  'updateProductMutation',
  'removeProductMutation',

  // Recipe mutations
  'createRecipeMutation',
  'updateRecipeMutation',
  'removeRecipeMutation',


  // Resolvers
  'genreResolver',
  'ingredientResolver',
  'invoiceResolver',
  'nutritionResolver',
  'orientationResolver',
  'productResolver',
  'recipeResolver',
  'userResolver',
  'userType',
], graphqlSchema);
