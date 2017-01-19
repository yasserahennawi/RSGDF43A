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
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
  cursorForObjectInConnection
} from 'graphql-relay';

import IoC from 'AppIoC';

export const userType = (
  userModel,
  nodeInterface,
  imageType,
  authManager
) => new GraphQLObjectType({
  name: 'User',
  description: 'A person who uses our app',
  fields: () => ({
    id: globalIdField('User'),
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    nickName: { type: GraphQLString },
    email: { type: GraphQLString },
    profileImage: { type: imageType },
    isGuest: {
      type: GraphQLBoolean,
      resolve: user => user.isGuest()
    },
    isAdmin: {
      type: GraphQLBoolean,
      resolve: user => user.isAdmin()
    },
    isBlogger: {
      type: GraphQLBoolean,
      resolve: user => user.isBlogger()
    },
    token: {
      type: GraphQLString,
      resolve: (user, _, { viewer }) => {
        if(user.checkId(viewer)) {
          return authManager.constructToken(user);
        }
        return null;
      }
    }
  }),
  interfaces: [nodeInterface],
  isTypeOf: obj => obj instanceof userModel || !!obj.isGuest,
});

IoC.callable('userType', ['userModel', 'nodeInterface', 'imageType', 'authManager'], userType);
