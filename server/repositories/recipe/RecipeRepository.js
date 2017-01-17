import Repository from '../Repository';
import ValidationError from  '../../errors/ValidationError';
import ForbiddenError from  '../../errors/ForbiddenError';
import IoC from 'AppIoC';

export default class RecipeRepository extends Repository {
  constructor(model, recipeUserPreferencesSearch) {
    super();
    this.model = model;
    this.recipeUserPreferencesSearch = recipeUserPreferencesSearch;
  }

  find(viewer, {
    // Search criteria
    product,
    creator,
  }) {
    const query = this.model.find();

    return query.exec();
  }

  findById(viewer, id) {
    return this.model.findById(id).exec();
  }

  async getNewOneByMealType(...args) {
    return this.recipeUserPreferencesSearch.getNewOneByMealType(...args);
  }

  async getDailyRecipes(...args) {
    return this.recipeUserPreferencesSearch.getDailyRecipes(...args);
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

IoC.singleton('recipeRepository', [
  'recipeModel',
  'recipeUserPreferencesSearch',
], RecipeRepository);
