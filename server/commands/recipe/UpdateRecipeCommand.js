import IoC from 'AppIoC';
import ForbiddenError from '../../errors/ForbiddenError';

export default class UpdateRecipeCommand {
  constructor(recipeRepository) {
    this.recipeRepository = recipeRepository;
  }

  async execute(viewer, recipeId, attrs) {
    return await this.recipeRepository.update(viewer, recipeId, attrs);
  }
}

IoC.singleton('updateRecipeCommand', ['recipeRepository'], UpdateRecipeCommand);
