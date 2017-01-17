import Validator from './Validator';
import IoC from 'AppIoC';

export default class GenreValidator extends Validator {
  constructor() {
    super();
  }

  validate(genre) {
    let promises = [
    ];

    return this.getErrors(promises);
  }
}

IoC.singleton('genreValidator', [], GenreValidator);
