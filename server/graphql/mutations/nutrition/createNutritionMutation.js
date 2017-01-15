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

export const createMutation = (commandExecuter, createNutritionCommand, nutritionType, errorType) => mutationWithClientMutationId({
  name: 'CreateNutrition',
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    nutrition: { type: nutritionType },
    error: { type: errorType },
  },
  mutateAndGetPayload: async (attrs, { viewer }) => {
    try {
      const nutrition = await commandExecuter.execute(createNutritionCommand, viewer, attrs);
      return { nutrition };
    } catch(e) {
      return { error: e.toObject() };
    }
  }
});

IoC.callable('createNutritionMutation', ['commandExecuter', 'createNutritionCommand', 'nutritionType', 'errorType'], createMutation);
