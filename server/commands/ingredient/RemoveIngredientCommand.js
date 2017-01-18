import IoC from 'AppIoC';
import ForbiddenError from 'errors/ForbiddenError';

export default class RemoveIngredientCommand {
  constructor(ingredientRepository) {
    this.ingredientRepository = ingredientRepository;
  }

  async execute(viewer, ingredientId) {
    return await this.ingredientRepository.remove(viewer, ingredientId);
  }
}

IoC.singleton('removeIngredientCommand', ['ingredientRepository'], RemoveIngredientCommand);
