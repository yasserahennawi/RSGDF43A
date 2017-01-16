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
  mutationWithClientMutationId,
} from 'graphql-relay';

import IoC from 'AppIoC';

export const createMutation = (commandExecuter, createIngredientCommand, ingredientType, errorType) => mutationWithClientMutationId({
  name: 'CreateIngredient',
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    category: { type: new GraphQLNonNull(GraphQLString) },
    subcategory: { type: GraphQLString },
  },
  outputFields: {
    ingredient: { type: ingredientType },
    error: { type: errorType },
  },
  mutateAndGetPayload: async (attrs, { viewer }) => {
    try {
      const ingredient = await commandExecuter.execute(createIngredientCommand, viewer, attrs);
      return { ingredient };
    } catch(e) {
      return { error: e.toObject() };
    }
  }
});

IoC.callable('createIngredientMutation', ['commandExecuter', 'createIngredientCommand', 'ingredientType', 'errorType'], createMutation);
