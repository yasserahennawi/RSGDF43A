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
  connectionDefinitions,
  globalIdField,
} from 'graphql-relay';

import IoC from 'AppIoC';

export const nutritionType = (
  nutritionModel,
  nodeInterface,
  userType
) => new GraphQLObjectType({
  name: 'Nutrition',
  fields: () => ({
    id: globalIdField('Nutrition'),
    name: { type: new GraphQLNonNull(GraphQLString) },
    creator: {
      type: new GraphQLNonNull(userType),
      resolve: nutrition => nutrition.getCreator(),
    },
  }),
  interfaces: [nodeInterface],
  isTypeOf: obj => obj instanceof nutritionModel,
});

IoC.callable('nutritionType', ['nutritionModel', 'nodeInterface', 'userType'], nutritionType);
