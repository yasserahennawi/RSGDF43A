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
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
  cursorForObjectInConnection
} from 'graphql-relay';

import IoC from 'AppIoC';

export const rootType = (
  userType,
  genreResolver,
  ingredientResolver,
  invoiceResolver,
  nutritionResolver,
  orientationResolver,
  productResolver,
  recipeResolver,
  userResolver
) => new GraphQLObjectType({
  name: 'Root',
  description: 'Root query that holds our viewer',
  fields: () => ({
    id: globalIdField('Root'),
    viewer: {
      type: new GraphQLNonNull(userType),
      resolve: ({ viewer }) => viewer,
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
  }),
});

IoC.callable('rootType', [
  'userType',
  'genreResolver',
  'ingredientResolver',
  'invoiceResolver',
  'nutritionResolver',
  'orientationResolver',
  'productResolver',
  'recipeResolver',
  'userResolver',
], rootType);
