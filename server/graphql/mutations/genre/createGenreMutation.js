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

export const createMutation = (commandExecuter, createGenreCommand, genreType, errorType) => mutationWithClientMutationId({
  name: 'CreateGenre',
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    genre: { type: genreType },
    error: { type: errorType },
  },
  mutateAndGetPayload: async (attrs, { viewer }) => {
    try {
      const genre = await commandExecuter.execute(createGenreCommand, viewer, attrs);
      return { genre };
    } catch(e) {
      return { error: e.toObject() };
    }
  }
});

IoC.callable('createGenreMutation', ['commandExecuter', 'createGenreCommand', 'genreType', 'errorType'], createMutation);
