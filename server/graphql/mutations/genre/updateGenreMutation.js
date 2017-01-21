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
  },
  mutateAndGetPayload: async ({id, ...attrs}, { viewer }) => {
    const genre = await commandExecuter.execute(updateGenreCommand, viewer, id, attrs);
    return { genre };
  }
});

IoC.callable('updateGenreMutation', ['commandExecuter', 'updateGenreCommand', 'genreType', 'errorType'], updateMutation);
