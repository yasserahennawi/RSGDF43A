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

export const updateMutation = (commandExecuter, updateNutritionCommand, nutritionType, errorType) => mutationWithClientMutationId({
  name: 'UpdateNutrition',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    nutrition: { type: nutritionType },
    error: { type: errorType },
  },
  mutateAndGetPayload: async ({id, ...attrs}, { viewer }) => {
    try {
      const nutrition = await commandExecuter.execute(updateNutritionCommand, viewer, id, attrs);
      return { nutrition };
    } catch(e) {
      return { error: e.toObject() };
    }
  }
});

IoC.callable('updateNutritionMutation', ['commandExecuter', 'updateNutritionCommand', 'nutritionType', 'errorType'], updateMutation);
