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
  globalIdField,
  connectionDefinitions,
} from 'graphql-relay';

import IoC from 'AppIoC';

export const orientationType = (
  orientationModel,
  nodeInterface,
  userType
) => new GraphQLObjectType({
  name: 'Orientation',
  fields: () => ({
    id: globalIdField('Orientation'),
    name: { type: new GraphQLNonNull(GraphQLString) },
    creator: {
      type: new GraphQLNonNull(userType),
      resolve: orientation => orientation.getCreator(),
    },
  }),
  interfaces: [nodeInterface],
  isTypeOf: obj => obj instanceof orientationModel,
});

IoC.callable('orientationType', ['orientationModel', 'nodeInterface', 'userType'], orientationType);
