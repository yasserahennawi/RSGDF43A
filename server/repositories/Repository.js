export default class Repository {

  constructor() {
    const abstractMethods = [
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
}
