import ValidationError from '../../errors/ValidationError';
import * as Q from 'q';
import * as _ from 'lodash';

export default class Validator {

  constructor() {
    const abstractMethods = [
      'validate',
    ];

    if (new.target === Validator) {
      throw new TypeError("Cannot construct Validator instances directly");
    }

    for(let methodName of abstractMethods) {
      if(typeof this[methodName] !== 'function') {
        throw new TypeError("Must override method");
      }
    }
  }

  validateAttrs(attrs) {
    let promises = [];
    for(let key in attrs) {
      if (this[key])
        promises.push(this[key].apply(this, [attrs[key]]));
    }
    return this.getErrors(promises);
  }

  getErrors(promises) {
    return Q.all(promises)
      .then(function(results) {
        let errors = {};
        results.forEach((result) => {
          if (result) {
            errors = {...errors, ...result};
          }
        });
        if (!_.isEmpty(errors)) {
          throw new ValidationError(errors);
        }
      });
  }
}
