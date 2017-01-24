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

import {
  mutationWithClientMutationId,
  fromGlobalId,
} from 'graphql-relay';

import {
  getActualId,
  getActualIds,
} from 'utils/graphql';

import IoC from 'AppIoC';

export const createMutation = (
  commandExecuter,
  createProductCommand,
  imageInput,
  priceInput,
  productType
) => mutationWithClientMutationId({
  name: 'CreateProduct',
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    // Author id
    author: { type: GraphQLString },
    // Genres ids
    genres: { type: new GraphQLList(GraphQLString) },
    // Nutrition id
    nutrition: { type: new GraphQLNonNull(GraphQLString) },
    //
    noOfRecipes: { type: GraphQLInt },
    orderDescription: { type: GraphQLString },
    coverImage: {type: imageInput},
    price: {type: priceInput},
  },
  outputFields: {
    product: { type: productType },
  },
  mutateAndGetPayload: async (input, { viewer }) => {
    let attrs = {
      name: input.name,
      author: getActualId(input.author),
      genres: getActualIds(input.genres),
      nutrition: getActualId(input.nutrition),
      noOfRecipes: input.noOfRecipes,
      orderDescription: input.orderDescription,
      price: input.price,
      coverImage: input.coverImage,
    };

    const product = await commandExecuter.execute(createProductCommand, viewer, attrs);
    return { product };
  }
});

// const getNutritionId = async (nutrition, commandExecuter, createNutritionCommand) => {
//   const { type, id } = fromGlobalId(nutrition);
//   // The user is requesting to create a new nutrition
//   if(type !== 'Nutrition') {
//     const newNutrition = await commandExecuter.execute(createNutritionCommand, viewer, {
//       name: nutrition,
//     });
//     return newNutrition.id;
//   } else {
//     return id;
//   }
// }

IoC.callable('createProductMutation', [
  'commandExecuter',
  'createProductCommand',
  'imageInput',
  'priceInput',
  'productType',
], createMutation);
