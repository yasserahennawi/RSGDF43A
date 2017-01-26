import Repository from './Repository';
import ValidationError from  'errors/ValidationError';
import ForbiddenError from  'errors/ForbiddenError';
import IoC from 'AppIoC';
import { getDocumentId } from 'utils/mongo';

export default class ProductRepository extends Repository {
  constructor(model, productQueryManager) {
    super();
    this.model = model;
    this.productQueryManager = productQueryManager;
  }

  async find(viewer, inputs) {
    if(viewer.isGuest()) {
      throw new ForbiddenError("You are not authorized to view products");
    }

    let query = this.model.find();
    query = this.productQueryManager.run(query, inputs);
    return await query.exec();
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

IoC.singleton('productRepository', ['productModel', 'productQueryManager'], ProductRepository);
