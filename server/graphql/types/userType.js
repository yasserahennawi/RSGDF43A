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
  imageType
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
  }),
  interfaces: [nodeInterface],
  isTypeOf: obj => obj instanceof userModel || !!obj.isGuest,
});

IoC.callable('userType', ['userModel', 'nodeInterface', 'imageType'], userType);
