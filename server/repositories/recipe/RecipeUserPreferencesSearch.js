import * as _ from 'lodash';
import IoC from 'AppIoC';

export default class RecipeUserPreferencesSearch {

  constructor(userModel) {
    this.userModel = userModel;
  }

  /** Get all recipes */
  async getAllRecipes(viewer) {
    return await this.userModel.find({ }).exec();
  }

  /**
   * This method will get a new recipe by meal type
   *
   * This is used by the user to refresh a recipe
   */
  async getNewOneByMealType(viewer, mealType) {
    const recipes = await this.getUserRecipesByMealType(viewer, mealType);
    return recipes[0];
  }

  /**
   * Return array of daily recipes
   *
   * @TODO @kareemmohamed update documentation
   */
  async getDailyRecipes(viewer, noOfDays = 1) {
    console.log(viewer, noOfDays);
    // @TODO @kareemmohamed move meal types to constant file
    const dinnerRecipes = await this.getUserRecipesByMealType(viewer, 'dinner', noOfDays);
    const launchRecipes = await this.getUserRecipesByMealType(viewer, 'launch', noOfDays);
    const breakfastRecipes = await this.getUserRecipesByMealType(viewer, 'breakfast', noOfDays);

    return Array(noOfDays).map(i => ({
      dinnerRecipe: dinnerRecipes[i],
      launchRecipe: launchRecipes[i],
      breakfastRecipe: breakfastRecipes[i],
    }));
  }

  /** Find all recipes by mealType */
  async getAllRecipesByMealType(viewer, mealType) {
    return await this.userModel.find({ mealType });
  }

  /**
   * Get recipes by meal type and adjusting with user prefrences
   */
  async getUserRecipesByMealType(viewer, mealType, noOfRecipes) {
    let recipes = await this.getAllRecipesByMealType(viewer, mealType);
    // Adjust recipes by user preferences
    recipes = await this.adjustToUserPreferences(viewer, recipes);
    // Slice them to the number of recipes
    return recipes.slice(0, noOfRecipes);
  }

  async adjustToUserPreferences(viewer, recipes) {
    let resultRecipes = await this.removeUserAlergies(viewer, recipes);
    resultRecipes = await this.orderByGenres(viewer, resultRecipes);
    resultRecipes = await this.orderByOrientations(viewer, resultRecipes);
    resultRecipes = await this.orderByIngredients(viewer, resultRecipes);
    return resultRecipes;
  }

  async removeUserAlergies(viewer, recipes) {
    return recipes.filter(recipe => {
      // Remove recipe if it's in user rejected recipes
      return !viewer.hasRejectedRecipe(recipe);
    });
  }

  /** @TODO @kareemmohamed waiting to see if recipe is attached to genre or nutrition */
  async orderByGenres(viewer, recipes) {
    // return _.sortBy(recipes, recipe => {
    //   return viewer.hasGenre(recipe.getGenreId)
    // });
    return recipes;
  }

  async orderByOrientations(viewer, recipes) {
    return _.sortBy(recipes, recipe => {
      return viewer.hasOrientation(recipe.orientation) ? -1 : 1;
    });
  }

  async orderByIngredients(viewer, recipes) {
    return _.sortBy(recipes, recipe => {
      return recipe.getIngredientIds().some(ingredientId =>
        viewer.hasIngredient(ingredientId)) ? -1 : 1;
    });
  }
}


IoC.singleton('recipeUserPreferencesSearch', ['userModel'], RecipeUserPreferencesSearch);
