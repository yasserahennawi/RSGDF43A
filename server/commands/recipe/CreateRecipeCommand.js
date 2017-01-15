import IoC from 'AppIoC';
import ForbiddenError from '../../errors/ForbiddenError';

export default class CreateRecipeCommand {
  constructor(recipeRepository) {
    this.recipeRepository = recipeRepository;
  }

  async execute(viewer, {
    name,
  }) {
    return await this.recipeRepository.create(viewer, {
      name
    });
  }
}

IoC.singleton('createRecipeCommand', ['recipeRepository'], CreateRecipeCommand);
