import Repository from '../Repository';
import ValidationError from  'errors/ValidationError';
import ForbiddenError from  'errors/ForbiddenError';
import IoC from 'AppIoC';
import { getDocumentId } from 'utils/mongo';

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

    if(product) {
      query.where('product', getDocumentId(product));
    }

    return query.exec();
  }

  countByProduct(viewer, product) {
    return this.model.find({ product: getDocumentId(product) }).count();
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

  async create(viewer, data) {
    if(!viewer.isAdmin() && !viewer.isBlogger() && !viewer.isPublisher()) {
      throw new ForbiddenError("You are not authorized to make this action.");
    }
    const count = await this.countByProduct(viewer, data.product);
    return this.model.create({
      ...data,
      number: (count || 0) + 1,
      creator: viewer._id,
    });
  }

  async update(viewer, id, data) {
    if(!viewer.isAdmin() && !viewer.isBlogger() && !viewer.isPublisher()) {
      throw new ForbiddenError("You are not authorized to make this action.");
    }

    const recipe = await this.model.findById(id).exec();

    return recipe.set(data).save();
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
