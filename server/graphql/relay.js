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

  const resolveGlobalId = globalId => {
    const { type, id } = fromGlobalId(globalId);

    switch(type) {
      case 'User':
        return userRepository.findById(id);
      case 'Genre':
        return genreRepository.findById(id);
      case 'Ingredient':
        return ingredientRepository.findById(id);
      case 'Invoice':
        return invoiceRepository.findById(id);
      case 'Nutrition':
        return nutritionRepository.findById(id);
      case 'Product':
        return productRepository.findById(id);
      case 'Recipe':
        return recipeRepository.findById(id);
      case 'Orientation':
        return orientationRepository.findById(id);
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


