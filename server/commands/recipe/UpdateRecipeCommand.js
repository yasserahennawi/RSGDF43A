import IoC from 'AppIoC';
import ForbiddenError from '../../errors/ForbiddenError';

export default class UpdateRecipeCommand {
  constructor(recipeRepository) {
    this.recipeRepository = recipeRepository;
  }

  async execute(viewer, recipeId, {
    name,
  }) {
    return await this.recipeRepository.update(viewer, recipeId, {
      name
    });
  }
}

IoC.singleton('updateRecipeCommand', ['recipeRepository'], UpdateRecipeCommand);
