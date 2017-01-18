import IoC from 'AppIoC';
import ValidationError from 'errors/ValidationError';
import ModelNotFoundError from 'errors/ModelNotFoundError';

export default class RefreshRecipeCommand {
  constructor(recipeRepository, userRepository) {
    this.recipeRepository = recipeRepository;
    this.userRepository = userRepository;
  }

  async execute(viewer, recipeId) {
    if(! recipeId) {
      throw new ValidationError({
        recipeId: "Recipe id is required to make this request",
      });
    }

    console.log('recipeId', recipeId);

    const recipe = await this.recipeRepository.findById(viewer, recipeId);

    if(! recipe) {
      throw new ModelNotFoundError("Recipe not found");
    }

    // First reject recipe in user preferences
    viewer = await this.userRepository.rejectRecipe(viewer, recipeId);

    // Now get new one of the same meal type
    return await this.recipeRepository.getNewOneByMealType(viewer, recipe.mealType);
  }
}

IoC.singleton('refreshRecipeCommand', [
  'recipeRepository',
  'userRepository',
], RefreshRecipeCommand);
