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
  connectionDefinitions,
  globalIdField,
} from 'graphql-relay';

import IoC from 'AppIoC';

export const ingredientType = (
  ingredientModel,
  nodeInterface,
  userType
) => new GraphQLObjectType({
  name: 'Ingredient',
  fields: () => ({
    id: globalIdField('Ingredient'),
    name: { type: new GraphQLNonNull(GraphQLString) },
    category: { type: GraphQLString },
    subCategory: { type: GraphQLString },
    creator: {
      type: new GraphQLNonNull(userType),
      resolve: ingredient => ingredient.getCreator(),
    },
  }),
  interfaces: [nodeInterface],
  isTypeOf: obj => obj instanceof ingredientModel,
});

IoC.callable('ingredientType', ['ingredientModel', 'nodeInterface', 'userType'], ingredientType);
