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

export const viewerType = (
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
  name: 'Viewer',
  description: 'A person who uses our app',
  fields: () => ({
    id: globalIdField('Viewer'),
    me: {
      type: new GraphQLNonNull(userType),
      resolve: viewer => viewer,
    },
    // All queries available to resolve from the viewer
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

IoC.callable('viewerType', [
  'userType',
  'genreResolver',
  'ingredientResolver',
  'invoiceResolver',
  'nutritionResolver',
  'orientationResolver',
  'productResolver',
  'recipeResolver',
  'userResolver',
], viewerType);
