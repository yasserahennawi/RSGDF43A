import Validator from './Validator';
import IoC from 'AppIoC';

export default class IngredientValidator extends Validator {
  constructor() {
    super();
  }

  validate(ingredient) {
    let promises = [
    ];

    return this.getErrors(promises);
  }
}

IoC.singleton('ingredientValidator', [], IngredientValidator);
