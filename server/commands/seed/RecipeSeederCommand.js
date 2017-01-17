import IoC from 'AppIoC';
import ForbiddenError from '../../errors/ForbiddenError';
import * as _ from 'lodash';
import * as Q from 'q';

export default class RecipeSeederCommand {

  constructor(
    recipeRepository,
    nutritionSeederCommand,
    nutritionRepository,
    orientationSeederCommand,
    orientationRepository,
    ingredientSeederCommand,
    ingredientRepository
  ) {
    this.recipeRepository = recipeRepository;
    this.nutritionSeederCommand = nutritionSeederCommand;
    this.nutritionRepository = nutritionRepository;
    this.orientationSeederCommand = orientationSeederCommand;
    this.orientationRepository = orientationRepository;
    this.ingredientSeederCommand = ingredientSeederCommand;
    this.ingredientRepository = ingredientRepository;

  }

  randomInteger(min, max) {
    return Math.floor(Math.random() * max) + min;
  }

  oneOf(choices) {
    return choices[ this.randomInteger(0, choices.length - 1) ];
  }

  async getNutritionId(viewer) {
    const names = _.map(this.nutritionSeederCommand.getData(), 'name');

    const randomName = names[ this.randomInteger(0, names.length - 1) ];

    const result = await this.nutritionRepository.find(viewer, {
      name: randomName,
    });
    return result[0]._id;
  }

  async getOrientationId(viewer) {
    const names = _.map(this.orientationSeederCommand.getData(), 'name');

    const randomName = names[ this.randomInteger(0, names.length - 1) ];

    const result =  await this.orientationRepository.find(viewer, {
      name: randomName,
    });
    return result[0]._id;
  }

  async getIngredientId(viewer) {
    const names = _.map(this.ingredientSeederCommand.getData(), 'name');

    const randomName = names[ this.randomInteger(0, names.length - 1) ];

    const result = await this.ingredientRepository.find(viewer, {
      name: randomName,
    });
    return result[0]._id;
  }


  async constructRecipe(viewer) {
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
      items: [
        { ingredient: await this.getIngredientId(), quantity: this.randomInteger(1, 4), unit: this.oneOf(['g', 'ml']) },
        { ingredient: await this.getIngredientId(), quantity: this.randomInteger(1, 4), unit: this.oneOf(['g', 'ml']) },
        { ingredient: await this.getIngredientId(), quantity: this.randomInteger(1, 4), unit: this.oneOf(['g', 'ml']) },
        { ingredient: await this.getIngredientId(), quantity: this.randomInteger(1, 4), unit: this.oneOf(['g', 'ml']) },
        { ingredient: await this.getIngredientId(), quantity: this.randomInteger(1, 4), unit: this.oneOf(['g', 'ml']) },
        { ingredient: await this.getIngredientId(), quantity: this.randomInteger(1, 4), unit: this.oneOf(['g', 'ml']) },
      ],
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

    return await this.recipeRepository.createAll(viewer, await this.constructRecipes(viewer, 50));
  }
}

IoC.singleton('recipeSeederCommand', [
  'recipeRepository',
  'nutritionSeederCommand',
  'nutritionRepository',
  'orientationSeederCommand',
  'orientationRepository',
  'ingredientSeederCommand',
  'ingredientRepository',
], RecipeSeederCommand);
