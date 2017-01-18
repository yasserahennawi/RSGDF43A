import IoC from 'AppIoC';
import ForbiddenError from 'errors/ForbiddenError';
import * as _ from 'lodash';
import * as Q from 'q';

export default class RecipeSeederCommand {

  constructor(
    recipeRepository,
    nutritionRepository,
    orientationRepository,
    ingredientRepository,
    seedHelper
  ) {
    this.recipeRepository = recipeRepository;
    this.nutritionRepository = nutritionRepository;
    this.orientationRepository = orientationRepository;
    this.ingredientRepository = ingredientRepository;
    this.seedHelper = seedHelper;
  }

  randomInteger(...args) {
    return this.seedHelper.randomInteger(...args);
  }

  oneOf(...args) {
    return this.seedHelper.oneOf(...args);
  }

  async getNutritionId(viewer) {
    return await this.seedHelper.getRandomId(viewer, this.nutritionRepository);
  }

  async getOrientationId(viewer) {
    return await this.seedHelper.getRandomId(viewer, this.orientationRepository);
  }

  async getIngredientIds(viewer, number) {
    return await this.seedHelper.getRandomIds(viewer, this.ingredientRepository, number);
  }

  async constructRecipe(viewer) {
    const ingredients = await this.getIngredientIds(viewer, this.randomInteger(3, 10));
    return {
      name: this.oneOf([
        'Beef Stroganoff',
        'Beef Wellington',
        'Caesar Salad',
        'Chicken Marengo',
        'Delmonico Steak',
        'Eggs Benedict',
        'Lobster Newburg',
        'Peach Melba',
      ]),
      difficulity: this.randomInteger(1, 5),
      calories: this.randomInteger(60, 140),
      // This is in minutes
      preparationTimeMin: this.oneOf([ 10, 15, 20, 25 ]),
      //
      nutrition: await this.getNutritionId(),
      mealType: this.oneOf([ 'dinner', 'launch', 'breakfast' ]),
      preparationInstructions: [
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
      ],
      mainImage: {
        src: this.oneOf([
          'http://www.seriouseats.com/images/2015/09/20150914-pressure-cooker-recipes-roundup-09.jpg',
          'https://s-media-cache-ak0.pinimg.com/originals/a9/8b/be/a98bbe847a0658a97fc80a85d7989f50.jpg',
          'http://www.bestpressurecookers.net/wp-content/uploads/2013/12/pressure-cooker-recipes1.jpg',
          'http://www.alliancebuffet.com.br/wp-content/uploads/2012/08/galerija8.jpg',
          'http://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/11/00/77/picfgzlZc.jpg',
        ]),
      },
      orientation: await this.getOrientationId(),
      items: ingredients.map(ingredient => ({
        ingredient,
        quantity: this.randomInteger(1, 9),
        unit: this.oneOf([ 'g', 'ml' ]),
      })),
      creator: viewer._id,
    };
  }

  async constructRecipes(viewer, noToConstruct) {
    return Q.all(
      _.fill(Array(noToConstruct)).map(n => this.constructRecipe(viewer))
    );
  }

  async execute(viewer) {
    if(!viewer.isSuper()) {
      throw new ForbiddenError("You are not authorized to do this action");
    }

    // console.log(await this.constructRecipes(viewer, 50));

    return await this.recipeRepository.createAll(viewer, await this.constructRecipes(viewer, 300));
  }
}

IoC.singleton('recipeSeederCommand', [
  'recipeRepository',
  'nutritionRepository',
  'orientationRepository',
  'ingredientRepository',
  'seedHelper',
], RecipeSeederCommand);
