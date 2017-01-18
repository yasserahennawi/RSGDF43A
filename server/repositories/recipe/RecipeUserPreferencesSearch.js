import * as _ from 'lodash';
import IoC from 'AppIoC';
import UnauthorizedError from 'errors/UnauthorizedError';

export default class RecipeUserPreferencesSearch {

  constructor(recipeModel) {
    this.recipeModel = recipeModel;
  }

  /**
   * This method will get a new recipe by meal type
   *
   * This is used by the user to refresh a recipe
   */
  async getNewOneByMealType(viewer, mealType) {
    if(viewer.isGuest()) {
      throw new UnauthorizedError();
    }
    const recipes = await this.__getUserRecipesByMealType(viewer, mealType);
    return recipes[0];
  }

  /**
   * Return array of daily recipes
   *
   * @TODO @kareemmohamed update documentation
   */
  async getDailyRecipes(viewer, noOfDays = 1) {
    if(viewer.isGuest()) {
      throw new UnauthorizedError();
    }
    noOfDays = Number(noOfDays);
    // @TODO @kareemmohamed move meal types to constant file
    const dinnerRecipes = await this.__getUserRecipesByMealType(viewer, 'dinner', noOfDays);
    const launchRecipes = await this.__getUserRecipesByMealType(viewer, 'launch', noOfDays);
    const breakfastRecipes = await this.__getUserRecipesByMealType(viewer, 'breakfast', noOfDays);

    return _.range(noOfDays).map(i => ({
      dinnerRecipe: dinnerRecipes[i],
      launchRecipe: launchRecipes[i],
      breakfastRecipe: breakfastRecipes[i],
    }));
  }

  /**
   * Get recipes by meal type and adjusting with user prefrences
   */
  async __getUserRecipesByMealType(viewer, mealType, noOfRecipes) {
    let recipes = await this.__getAllRecipesByMealType(viewer, mealType);
    // Adjust recipes by user preferences
    recipes = await this.__adjustToUserPreferences(viewer, recipes);
    // Slice them to the number of recipes
    return recipes.slice(0, noOfRecipes);
  }

  /** Find all recipes by mealType */
  async __getAllRecipesByMealType(viewer, mealType) {
    return await this.recipeModel.find({ mealType });
  }

  async __adjustToUserPreferences(viewer, recipes) {
    let resultRecipes = await this.__removeUserAlergies(viewer, recipes);
    console.log('resultRecipes', resultRecipes.length)
    resultRecipes = await this.__orderByGenres(viewer, resultRecipes);
    console.log('resultRecipes', resultRecipes.length)
    resultRecipes = await this.__orderByOrientations(viewer, resultRecipes);
    console.log('resultRecipes', resultRecipes.length)
    resultRecipes = await this.__orderByIngredients(viewer, resultRecipes);
    console.log('resultRecipes', resultRecipes.length)
    return resultRecipes;
  }

  async __removeUserAlergies(viewer, recipes) {
    return recipes.filter(recipe => {
      // Remove recipe if it's in user rejected recipes
      return !viewer.hasRejectedRecipe(recipe);
    });
  }

  /** @TODO @kareemmohamed waiting to see if recipe is attached to genre or nutrition */
  async __orderByGenres(viewer, recipes) {
    // return _.sortBy(recipes, recipe => {
    //   return viewer.hasGenre(recipe.getGenreId)
    // });
    return recipes;
  }

  async __orderByOrientations(viewer, recipes) {
    return _.sortBy(recipes, recipe => {
      return viewer.hasOrientation(recipe.orientation) ? -1 : 1;
    });
  }

  async __orderByIngredients(viewer, recipes) {
    return _.sortBy(recipes, recipe => {
      return recipe.getIngredientIds().some(ingredientId =>
        viewer.hasIngredient(ingredientId)) ? -1 : 1;
    });
  }
}


IoC.singleton('recipeUserPreferencesSearch', ['recipeModel'], RecipeUserPreferencesSearch);
