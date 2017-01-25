import Repository from './Repository';
import ValidationError from  'errors/ValidationError';
import ForbiddenError from  'errors/ForbiddenError';
import IoC from 'AppIoC';
import { getDocumentId } from 'utils/mongo';

export default class ProductRepository extends Repository {
  constructor(model) {
    super();
    this.model = model;
  }

  find(viewer, {
    // All availabe query options
    year = 2016,
    month = 1,
    day = 1,
    creator = null,
    mine = false,
  }) {
    console.log(viewer);
    if(viewer.isGuest()) {
      throw new ForbiddenError("You are not authorized to view products");
    }

    const query = this.model.find();

    if(creator) {
      query.where('creator', getDocumentId(creator));
    }

    if(mine) {
      query.where('creator', getDocumentId(viewer));
    }

    query.where({
      createdAt: { $gt: new Date(year, month, day) }
    });

    return query.exec();
  }

  findById(viewer, id) {
    if(viewer.isGuest()) {
      throw new ForbiddenError("You are not authorized to view products");
    }
    return this.model.findById(id).exec();
  }

  create(viewer, data) {
    if(!viewer.isAdmin() && !viewer.isBlogger() && !viewer.isPublisher()) {
      throw new ForbiddenError("You are not authorized to make this action.");
    }
    return this.model.create({
      ...data,
      creator: viewer._id,
    });
  }

  async update(viewer, id, data) {
    if(!viewer.isAdmin() && !viewer.isBlogger() && !viewer.isPublisher()) {
      throw new ForbiddenError("You are not authorized to make this action.");
    }

    const product = await this.model.findById(id).exec();

    return product.set(data).save();
  }

  remove(viewer, id) {
    if(!viewer.isAdmin()) {
      throw new ForbiddenError("You are not authorized to make this action.");
    }
    return this.model.remove({ _id: id }).exec();
  }
}

IoC.singleton('productRepository', ['productModel'], ProductRepository);
