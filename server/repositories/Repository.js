import * as Q from 'q';

export default class Repository {

  constructor() {
    const abstractMethods = [
      'find',
      'findById',
      'create',
      'update',
      'remove',
    ];

    if (new.target === Repository) {
      throw new TypeError("Cannot construct Repository instances directly");
    }

    for(let methodName of abstractMethods) {
      if(typeof this[methodName] !== 'function') {
        throw new TypeError("Must override method");
      }
    }
  }

  async createAll(viewer, arr) {
    return Q.all(arr.map(data => this.create(viewer, data)));
  }

}
