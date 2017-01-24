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

export const updateMutation = (
  commandExecuter,
  updateProductCommand,
  imageInput,
  priceInput,
  productType
) => mutationWithClientMutationId({
  name: 'UpdateProduct',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
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
    console.log('updating product', input);
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

    const product = await commandExecuter.execute(updateProductCommand, viewer, getActualId(input.id), attrs);
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

IoC.callable('updateProductMutation', [
  'commandExecuter',
  'updateProductCommand',
  'imageInput',
  'priceInput',
  'productType',
], updateMutation);
