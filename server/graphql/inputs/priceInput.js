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

import IoC from 'AppIoC';

const priceInput = new GraphQLInputObjectType({
  name: 'priceInput',
  fields: () => ({
    value: {type: GraphQLFloat},
    currency: {type: new GraphQLNonNull(GraphQLString)},
  })
});

IoC.value('priceInput', priceInput);
