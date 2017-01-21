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

export const removeMutation = (commandExecuter, removeNutritionCommand, errorType) => mutationWithClientMutationId({
  name: 'RemoveNutrition',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    deleted: { type: GraphQLBoolean },
    id: { type: GraphQLString },
  },
  mutateAndGetPayload: async ({ id }, { viewer }) => {
    const result = await commandExecuter.execute(removeNutritionCommand, viewer, id);
    return { id: result._id, deleted: true };
  }
});

IoC.callable('removeNutritionMutation', ['commandExecuter', 'removeNutritionCommand', 'errorType'], removeMutation);
