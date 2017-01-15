import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLSchema,
} from 'graphql';

import IoC from 'AppIoC';

export const graphqlSchema = (
  nodeField,
  viewerResolver,
  setViewerMutation,
  loginMutation,
  registerMutation,
  updateUserMutation,
  createGenreMutation,
  updateGenreMutation,
  removeGenreMutation
) => {

  /**
   * Construct schema (query and mutation)
   *
   * query: root query has only the viewer
   * mutation: all available mutations in our application
   */
  return new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: () => ({
        node: nodeField,
        // the only root value is the viewer
        viewer: viewerResolver,
      })
    }),
    mutation: new GraphQLObjectType({
      name: 'Mutation',
      fields: () => ({
        setViewer: setViewerMutation,
        login: loginMutation,
        register: registerMutation,
        updateUser: updateUserMutation,
        createGenre: createGenreMutation,
        updateGenre: updateGenreMutation,
        removeGenre: removeGenreMutation
      })
    }),
  });
}

IoC.callable('graphqlSchema', [
  'nodeField',
  'viewerResolver',

  // Authentication mutations
  'setViewerMutation',
  'loginMutation',
  'registerMutation',

  // User mutations
  'updateUserMutation',

  // Genre mutations
  'createGenreMutation',
  'updateGenreMutation',
  'removeGenreMutation',
], graphqlSchema);
