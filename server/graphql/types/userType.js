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
    fullName: { type: GraphQLString, resolve: user => `${user.firstName} ${user.lastName}` },

    email: { type: GraphQLString },
    company: { type: GraphQLString },
    createdAt: { type: GraphQLString },

    addressStreet: {type: GraphQLString},
    addressStreetNumber: {type: GraphQLString},
    addressComplement: {type: GraphQLString},
    addressZip: {type: GraphQLString},
    addressCity: {type: GraphQLString},
    addressCountry: {type: GraphQLString},

    profileImage: { type: imageType },
    userType: {
      type: GraphQLString,
    },
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
    isPublisher: {
      type: GraphQLBoolean,
      resolve: user => user.isPublisher()
    },
    token: {
      type: GraphQLString,
      resolve: (user, _, { viewer }) => {
        if(user.checkId(viewer)) {
          return authManager.constructToken(user);
        }
        return null;
      }
    },


    totalProducts: {
      type: GraphQLInt,
      // @TODO
      resolve: () => 0,
    }
  }),
  interfaces: [nodeInterface],
  isTypeOf: obj => obj instanceof userModel || !!obj.isGuest,
});

IoC.callable('userType', ['userModel', 'nodeInterface', 'imageType', 'authManager'], userType);
