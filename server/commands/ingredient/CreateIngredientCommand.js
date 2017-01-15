import IoC from 'AppIoC';
import ForbiddenError from '../../errors/ForbiddenError';

export default class CreateIngredientCommand {
  constructor(ingredientRepository) {
    this.ingredientRepository = ingredientRepository;
  }

  async execute(viewer, {
    name,
  }) {
    return await this.ingredientRepository.create(viewer, {
      name
    });
  }
}

IoC.singleton('createIngredientCommand', ['ingredientRepository'], CreateIngredientCommand);
