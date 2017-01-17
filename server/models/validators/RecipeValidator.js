import Validator from './Validator';
import IoC from 'AppIoC';

export default class RecipeValidator extends Validator {
  constructor() {
    super();
  }

  validate(recipe) {
    let promises = [
    ];

    return this.getErrors(promises);
  }
}

IoC.singleton('recipeValidator', [], RecipeValidator);
