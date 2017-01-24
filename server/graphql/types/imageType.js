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
} from 'graphql-relay';

import IoC from 'AppIoC';

// @TODO Find a better place for this method
function getNearestVersion(image, width, height, resolutionMargin = 0) {
  if(! width || !height) {
    return image;
  }

  if(!image.versions || image.versions.length === 0) {
    return image;
  }

  let smallestDiffVersion = image;
  let smallestDiff = 100000;

  for (var i = 0; i < image.versions.length; i++) {
    let version = image.versions[i];

    if(version.width < (width + resolutionMargin)
      || version.height < (height + resolutionMargin)) {
      continue;
    }

    let diff = (version.width - width + resolutionMargin)
      + (version.height - height + resolutionMargin);

    if(diff < smallestDiff) {
      smallestDiff = diff;
      smallestDiffVersion = version;
    }
  }

  return smallestDiffVersion;
}

const versionType = new GraphQLObjectType({
  name: 'ImageVersion',
  description: 'Image version',
  fields: () => ({
    src: { type: GraphQLString },
    width: { type: GraphQLInt },
    height: { type: GraphQLInt },
  }),
});

export const imageType = () => new GraphQLObjectType({
  name: 'Image',
  description: 'Image object',
  fields: () => ({
    src: {type: GraphQLString},
    versions: {type: new GraphQLList(versionType)},
    // Image version
    version: {
      type: versionType,
      args: {
        width: { type: new GraphQLNonNull(GraphQLInt) },
        height: { type: new GraphQLNonNull(GraphQLInt) },
      },
      // @TODO: Get correct image version
      resolve: (image, {width, height}) => {
        return getNearestVersion(image, width, height);
      }
    }
  }),
});

IoC.callable('imageType', [], imageType);
