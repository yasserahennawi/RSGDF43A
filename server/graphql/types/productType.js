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
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
  cursorForObjectInConnection
} from 'graphql-relay';

import IoC from 'AppIoC';

export const productType = (
  productModel,
  nodeInterface,
  imageType,
  priceType,
  recipesConnectionType,
  genresConnectionType,
  nutritionType,
  userType
) => new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: globalIdField('User'),
    name: { type: GraphQLString },
    price: { type: priceType },
    coverImage: { type: imageType },
    isAccepted: {
      type: GraphQLBoolean,
      resolve: product => product.isAccepted(),
    },
    isRejected: {
      type: GraphQLBoolean,
      resolve: product => product.isRejected(),
    },
    isAwaiting: {
      type: GraphQLBoolean,
      resolve: product => product.isAwaiting(),
    },
    recipes: {
      type: recipesConnectionType,
      args: connectionArgs,
      resolve: (product, args) => connectionFromPromisedArray(
        product.getRecipes(),
        args
      ),
    },
    genres: {
      type: genresConnectionType,
      args: connectionArgs,
      resolve: (product, args) => connectionFromPromisedArray(
        product.getGenres(),
        args
      ),
    },
    nutrition: {
      type: new GraphQLNonNull(nutritionType),
      resolve: product => product.getNutrition(),
    },
    creator: {
      type: new GraphQLNonNull(userType),
      resolve: product => product.getCreator(),
    },
    author: {
      type: new GraphQLNonNull(userType),
      resolve: product => product.getAuthor(),
    },
  }),
  interfaces: [nodeInterface],
  isTypeOf: obj => obj instanceof productModel,
});

IoC.callable('productType', [
  'productModel',
  'nodeInterface',
  'imageType',
  'priceType',
  'recipesConnectionType',
  'genresConnectionType',
  'nutritionType',
  'userType'
], productType);
