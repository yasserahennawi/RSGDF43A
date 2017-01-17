import Validator from './Validator';
import IoC from 'AppIoC';

export default class UserValidator extends Validator {
  constructor() {
    super();
  }

  validate(user) {
    let promises = [
    ];

    return this.getErrors(promises);
  }
}

IoC.singleton('userValidator', [], UserValidator);
