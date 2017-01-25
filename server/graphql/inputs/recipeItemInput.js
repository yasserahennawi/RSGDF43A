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

const recipeItemInput = new GraphQLInputObjectType({
  name: 'recipeItemInput',
  fields: () => ({
    ingredient: {type: new GraphQLNonNull(GraphQLString)},
    quantity: {type: GraphQLInt},
    unit: {type: new GraphQLNonNull(GraphQLString)},
  })
});

IoC.value('recipeItemInput', recipeItemInput);
