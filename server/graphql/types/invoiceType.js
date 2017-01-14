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

export const invoiceType = (
  invoiceModel,
  nodeInterface,
  userType
) => new GraphQLObjectType({
  name: 'Invoice',
  fields: () => ({
    id: globalIdField('Invoice'),
    name: { type: new GraphQLNonNull(GraphQLString) },
    creator: {
      type: new GraphQLNonNull(userType),
      resolve: invoice => invoice.getCreator(),
    },
  }),
  interfaces: [nodeInterface],
  isTypeOf: obj => obj instanceof invoiceModel,
});

IoC.callable('invoiceType', ['invoiceModel', 'nodeInterface', 'userType'], invoiceType);
