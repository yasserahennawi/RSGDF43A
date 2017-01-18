import IoC from 'AppIoC';
import ForbiddenError from 'errors/ForbiddenError';
import * as Q from 'q';

export default class FlushDBCommand {

  constructor(connection, secretKey) {
    this.connection = connection;
    this.secretKey = secretKey;
  }

  emptyCollection(collectionName) {
    if(! this.connection.collections[collectionName]) {
      return Q.resolve(null);
    }

    let deferred = Q.defer();
    this.connection.collections[collectionName].remove( function(err) {
      if(err) {
        console.log("ERROR " + collectionName, err);
        deferred.reject(err);
      } else {
        deferred.resolve(null);
      }
    })
    return deferred.promise;
  };

  async execute(secretKey) {
    if(this.secretKey !== secretKey) {
      throw new ForbiddenError("You are not authorized to do this action");
    }

    const collections = [
      'new_genres',
      'new_ingredients',
      'new_invoices',
      'new_nutritions',
      'new_orientations',
      'new_products',
      'new_recipes',
      'new_users',
    ];

    // Empty all collections
    return Q.all(collections.map(collectionName => this.emptyCollection(collectionName)));
  }
}

IoC.singleton('flushDBCommand', ['connection', 'secretKey'], FlushDBCommand);
