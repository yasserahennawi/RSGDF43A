import Validator from './Validator';
import IoC from 'AppIoC';

export default class OrientationValidator extends Validator {
  constructor() {
    super();
  }

  validate(orientation) {
    let promises = [
    ];

    return this.getErrors(promises);
  }
}

IoC.singleton('orientationValidator', [], OrientationValidator);
