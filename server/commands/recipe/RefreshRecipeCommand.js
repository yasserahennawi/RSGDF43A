import IoC from 'AppIoC';

export default class RefreshRecipeCommand {
  constructor(recipeRepository, userRepository) {
    this.recipeRepository = recipeRepository;
    this.userRepository = userRepository;
  }

  async execute(viewer, recipeId, attrs) {
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
