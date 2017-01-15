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

export const updateMutation = (commandExecuter, updateGenreCommand, genreType, errorType) => mutationWithClientMutationId({
  name: 'UpdateGenre',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    genre: { type: genreType },
    error: { type: errorType },
  },
  mutateAndGetPayload: async ({id, ...attrs}, { viewer }) => {
    try {
      const genre = await commandExecuter.execute(updateGenreCommand, viewer, id, attrs);
      return { genre };
    } catch(e) {
      return { error: e.toObject() };
    }
  }
});

IoC.callable('updateGenreMutation', ['commandExecuter', 'updateGenreCommand', 'genreType', 'errorType'], updateMutation);
