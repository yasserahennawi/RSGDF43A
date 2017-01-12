import {
  fromGlobalId,
  nodeDefinitions,
} from 'graphql-relay';
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLSchema,
} from 'graphql';

// Import object types
import configureImageType from './types/imageType';
import configureErrorType from './types/errorType';
import configureUserType from './types/userType';

// Import mutations
import configureLoginMutation from './mutations/loginMutation';
import configureRegisterMutation from './mutations/registerMutation';
import configureSetViewerMutation from './mutations/setViewerMutation';

export default ({
  userRepository,
  UserModel,
  authManager,

  commandExecuter,
  loginUserCommand,
  registerUserCommand,
}) => {

  /**
   * Map from globalId to model
   * @param  {string} globalId
   * @return {Object}   Model|null
   */
  const resolveGlobalId = globalId => {
    const { type, id } = fromGlobalId(globalId);

    switch(type) {
      case 'User':
        return userRepository.findById(id);
    }
  }

  /**
   * Map from object to type
   * @param  {Object} obj
   * @return {Object}     GraphQLObjectType|null
   */
  const resolveObjectType = obj => {
    if(obj instanceof UserModel) {
      return userType;
    }
  }

  /**
   * We get the node interface and field from the Relay library.
   *
   * The first method defines the way we resolve an ID to its object.
   * The second defines the way we resolve an object to its GraphQL type.
   */
  const { nodeInterface, nodeField } = nodeDefinitions(
    resolveGlobalId,
    resolveObjectType,
  );

  /**
   * All object types in our application
   */
  const imageType = configureImageType();
  const errorType = configureErrorType();
  const userType = configureUserType(nodeInterface, imageType);

  /**
   * All mutations in our application
   */
  const setViewerMutation = configureSetViewerMutation(authManager);
  const loginMutation = configureLoginMutation(commandExecuter, loginUserCommand, userType, errorType);
  const registerMutation = configureRegisterMutation(commandExecuter, registerUserCommand, userType, errorType);

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
        viewer: {
          args: {
            token: { type: new GraphQLNonNull(GraphQLString) },
          },
          type: userType,
          resolve: (parent, { token }) => authManager.getViewer(token)
        }
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
