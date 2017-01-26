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
    addition: {type: GraphQLString},
    newIngredientName: {type: GraphQLString},
    ingredient: {type: GraphQLString},
    quantity: {type: GraphQLFloat},
    unit: {type: new GraphQLNonNull(GraphQLString)},
  })
});

IoC.value('recipeItemInput', recipeItemInput);
