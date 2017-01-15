import IoC from 'AppIoC';
import ForbiddenError from '../../errors/ForbiddenError';

export default class UpdateIngredientCommand {
  constructor(ingredientRepository) {
    this.ingredientRepository = ingredientRepository;
  }

  async execute(viewer, ingredientId, {
    name,
  }) {
    return await this.ingredientRepository.update(viewer, ingredientId, {
      name
    });
  }
}

IoC.singleton('updateIngredientCommand', ['ingredientRepository'], UpdateIngredientCommand);
