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

export const updateMutation = (commandExecuter, updateIngredientCommand, ingredientType, errorType) => mutationWithClientMutationId({
  name: 'UpdateIngredient',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    ingredient: { type: ingredientType },
    error: { type: errorType },
  },
  mutateAndGetPayload: async ({id, ...attrs}, { viewer }) => {
    try {
      const ingredient = await commandExecuter.execute(updateIngredientCommand, viewer, id, attrs);
      return { ingredient };
    } catch(e) {
      return { error: e.toObject() };
    }
  }
});

IoC.callable('updateIngredientMutation', ['commandExecuter', 'updateIngredientCommand', 'ingredientType', 'errorType'], updateMutation);
