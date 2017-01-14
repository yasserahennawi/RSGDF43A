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
  globalIdField,
} from 'graphql-relay';

import IoC from 'AppIoC';

export const priceType = () => new GraphQLObjectType({
  name: 'Price',
  fields: () => ({
    value: {type: new GraphQLNonNull(GraphQLFloat)},
    currency: {type: new GraphQLNonNull(GraphQLString)},
  }),
});

IoC.callable('priceType', [], priceType);
