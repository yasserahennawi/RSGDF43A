import {
  fromGlobalId,
  nodeDefinitions,
} from 'graphql-relay';

import IoC from 'AppIoC';

export const relayNodeDefinitions = (
  userRepository,
  genreRepository,
  ingredientRepository,
  invoiceRepository,
  nutritionRepository,
  productRepository,
  recipeRepository,
  orientationRepository
) => {

  const resolveGlobalId = (globalId, { viewer }) => {
    const { type, id } = fromGlobalId(globalId);

    switch(type) {
      case 'User':
        return userRepository.findById(viewer, id);
      case 'Genre':
        return genreRepository.findById(viewer, id)
      case 'Ingredient':
        return ingredientRepository.findById(viewer, id);
      case 'Invoice':
        return invoiceRepository.findById(viewer, id);
      case 'Nutrition':
        return nutritionRepository.findById(viewer, id);
      case 'Product':
        return productRepository.findById(viewer, id);
      case 'Recipe':
        return recipeRepository.findById(viewer, id);
      case 'Orientation':
        return orientationRepository.findById(viewer, id);
    }
  }

  /**
   * We get the node interface and field from the Relay library.
   *
   * The first method defines the way we resolve an ID to its object.
   * The second defines the way we resolve an object to its GraphQL type.
   */
  return nodeDefinitions(
    resolveGlobalId
  );
};

IoC.callable('relayNodeDefinitions', [
  'userRepository',
  'genreRepository',
  'ingredientRepository',
  'invoiceRepository',
  'nutritionRepository',
  'productRepository',
  'recipeRepository',
  'orientationRepository',
], relayNodeDefinitions);

IoC.callable('nodeInterface', [
  'relayNodeDefinitions'
], ({ nodeInterface }) => nodeInterface);

IoC.callable('nodeField', [
  'relayNodeDefinitions'
], ({ nodeField }) => nodeField);


