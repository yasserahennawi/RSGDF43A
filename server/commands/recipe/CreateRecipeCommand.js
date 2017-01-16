import IoC from 'AppIoC';
import ForbiddenError from '../../errors/ForbiddenError';

export default class CreateRecipeCommand {
  constructor(recipeRepository) {
    this.recipeRepository = recipeRepository;
  }

  async execute(viewer, attrs) {
    return await this.recipeRepository.create(viewer, attrs);
  }
}

IoC.singleton('createRecipeCommand', ['recipeRepository'], CreateRecipeCommand);
