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

export const updateMutation = (commandExecuter, updateOrientationCommand, orientationType, errorType) => mutationWithClientMutationId({
  name: 'UpdateOrientation',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    orientation: { type: orientationType },
    error: { type: errorType },
  },
  mutateAndGetPayload: async ({id, ...attrs}, { viewer }) => {
    try {
      const orientation = await commandExecuter.execute(updateOrientationCommand, viewer, id, attrs);
      return { orientation };
    } catch(e) {
      return { error: e.toObject() };
    }
  }
});

IoC.callable('updateOrientationMutation', ['commandExecuter', 'updateOrientationCommand', 'orientationType', 'errorType'], updateMutation);
