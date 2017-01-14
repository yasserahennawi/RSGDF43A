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

export const genreType = (
  genreModel,
  nodeInterface,
  userType
) => new GraphQLObjectType({
  name: 'Genre',
  fields: () => ({
    id: globalIdField('Genre'),
    name: { type: new GraphQLNonNull(GraphQLString) },
    creator: {
      type: new GraphQLNonNull(userType),
      resolve: genre => genre.getCreator(),
    },
  }),
  interfaces: [nodeInterface],
  isTypeOf: obj => obj instanceof genreModel,
});

IoC.callable('genreType', ['genreModel', 'nodeInterface', 'userType'], genreType);
