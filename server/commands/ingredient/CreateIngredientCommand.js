import IoC from 'AppIoC';
import ForbiddenError from 'errors/ForbiddenError';

export default class CreateIngredientCommand {
  constructor(ingredientRepository) {
    this.ingredientRepository = ingredientRepository;
  }

  async execute(viewer, attrs) {
    return await this.ingredientRepository.create(viewer, attrs);
  }
}

IoC.singleton('createIngredientCommand', ['ingredientRepository'], CreateIngredientCommand);
