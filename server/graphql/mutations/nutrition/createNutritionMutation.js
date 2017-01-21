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
  },
  mutateAndGetPayload: async (attrs, { viewer }) => {
    const nutrition = await commandExecuter.execute(createNutritionCommand, viewer, attrs);
    return { nutrition };
  }
});

IoC.callable('createNutritionMutation', ['commandExecuter', 'createNutritionCommand', 'nutritionType', 'errorType'], createMutation);
