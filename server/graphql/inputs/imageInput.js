import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInputObjectType
} from 'graphql';

import IoC from 'AppIoC';

const versionInput = new GraphQLInputObjectType({
  name: 'ImageVersionInput',
  fields: () => ({
    src: { type: GraphQLString },
    width: { type: GraphQLInt },
    height: { type: GraphQLInt },
  }),
});

const imageInput = new GraphQLInputObjectType({
  name: 'ImageInput',
  fields: () => ({
    src: {type: GraphQLString},
    versions: {type: new GraphQLList(versionInput)}
  }),
});

IoC.value('imageInput', imageInput);
