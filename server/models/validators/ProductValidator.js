import Validator from './Validator';
import IoC from 'AppIoC';

export default class ProductValidator extends Validator {
  constructor() {
    super();
  }

  /**
   * Product can have only 2 genres
   */
  validateTwoGenres(genres) {
    if(genres.length > 2) {
      return { genres: "Product can only have 2 genres!" };
    }
  }

  validate(product) {
    let promises = [
      this.validateTwoGenres(product.genres),
    ];

    return this.getErrors(promises);
  }
}

IoC.singleton('productValidator', [], ProductValidator);
