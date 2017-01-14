import Repository from './Repository';
import ValidationError from  '../errors/ValidationError';
import ForbiddenError from  '../errors/ForbiddenError';
import IoC from 'AppIoC';

export default class RecipeRepository extends Repository {
  constructor(model) {
    super();
    this.model = model;
  }

  find(viewer, {
    // Search criteria
  }) {
    const query = this.model.find();

    return query.exec();
  }

  findById(viewer, id) {
    return this.model.findById(id).exec();
  }

  create(viewer, data) {
    if(!viewer.isAdmin()) {
      throw new ForbiddenError("You are not authorized to make this action.");
    }
    return this.model.create({
      ...data,
      creator: viewer._id,
    });
  }

  update(viewer, id, data) {
    if(!viewer.isAdmin()) {
      throw new ForbiddenError("You are not authorized to make this action.");
    }
    return this.model.update({ _id: id }, data).exec();
  }

  remove(viewer, id) {
    if(!viewer.isAdmin()) {
      throw new ForbiddenError("You are not authorized to make this action.");
    }
    return this.model.remove({ _id: id }).exec();
  }
}

IoC.singleton('recipeRepository', ['recipeModel'], RecipeRepository);
