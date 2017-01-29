import Validator from './Validator';
import IoC from 'AppIoC';

export default class UserValidator extends Validator {
  constructor() {
    super();
  }

  validatePassword(password) {
    if(password.length < 4) {
      return { password: "Password is too short!" };
    }
  }

  validate(user) {
    let promises = [
      this.validatePassword(user.password),
    ];

    return this.getErrors(promises);
  }
}

IoC.singleton('userValidator', [], UserValidator);
