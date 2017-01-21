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

export const createMutation = (commandExecuter, createOrientationCommand, orientationType, errorType) => mutationWithClientMutationId({
  name: 'CreateOrientation',
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    orientation: { type: orientationType },
  },
  mutateAndGetPayload: async (attrs, { viewer }) => {
    const orientation = await commandExecuter.execute(createOrientationCommand, viewer, attrs);
    return { orientation };
  }
});

IoC.callable('createOrientationMutation', ['commandExecuter', 'createOrientationCommand', 'orientationType', 'errorType'], createMutation);
