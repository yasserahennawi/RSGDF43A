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
  registerMutation
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
      })
    }),
  });
}

IoC.callable('graphqlSchema', [
  'nodeField',
  'viewerResolver',
  'setViewerMutation',
  'loginMutation',
  'registerMutation',
], graphqlSchema);
