import Validator from './Validator';
import IoC from 'AppIoC';

export default class NutritionValidator extends Validator {
  constructor() {
    super();
  }

  validate(nutrition) {
    let promises = [
    ];

    return this.getErrors(promises);
  }
}

IoC.singleton('nutritionValidator', [], NutritionValidator);
