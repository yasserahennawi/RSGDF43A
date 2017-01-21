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
  },
  mutateAndGetPayload: async (attrs, { viewer }) => {
    const genre = await commandExecuter.execute(createGenreCommand, viewer, attrs);
    return { genre };
  }
});

IoC.callable('createGenreMutation', ['commandExecuter', 'createGenreCommand', 'genreType', 'errorType'], createMutation);
