import IoC from 'AppIoC';
import ForbiddenError from '../../errors/ForbiddenError';

export default class RecipeSeederCommand {

  constructor(recipeRepository) {
    this.recipeRepository = recipeRepository;
  }

  async execute(viewer) {
    if(!viewer.isSuper()) {
      throw new ForbiddenError("You are not authorized to do this action");
    }
  }
}

IoC.singleton('recipeSeederCommand', ['recipeRepository'], RecipeSeederCommand);
