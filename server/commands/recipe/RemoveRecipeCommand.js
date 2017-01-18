import IoC from 'AppIoC';
import ForbiddenError from 'errors/ForbiddenError';

export default class RemoveRecipeCommand {
  constructor(recipeRepository) {
    this.recipeRepository = recipeRepository;
  }

  async execute(viewer, recipeId) {
    return await this.recipeRepository.remove(viewer, recipeId);
  }
}

IoC.singleton('removeRecipeCommand', ['recipeRepository'], RemoveRecipeCommand);
