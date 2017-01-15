import Repository from './Repository';
import ValidationError from  '../errors/ValidationError';
import ForbiddenError from  '../errors/ForbiddenError';
import ModelNotFoundError from  '../errors/ModelNotFoundError';
import IoC from 'AppIoC';
import * as Q from 'q';

export default class GenreRepository extends Repository {
  constructor(model) {
    super();
    this.model = model;
  }

  async find(viewer, {
    // Search criteria
  }) {
    const query = this.model.find();

    return query.exec();
  }

  async findById(viewer, id) {
    return this.model.findById(id).exec();
  }

  async create(viewer, data) {
    if(!viewer.isAdmin()) {
      throw new ForbiddenError("You are not authorized to make this action.");
    }

    return this.model.create({
      ...data,
      creator: viewer._id,
    });
  }

  async update(viewer, id, data) {
    if(!viewer.isAdmin()) {
      throw new ForbiddenError("You are not authorized to make this action.");
    }

    const genre = await this.model.findById(id);

    if(! genre) {
      throw new ModelNotFoundError("The genre you are requesting to update doesnt exist");
    }

    return genre.set(data).save();
  }

  async remove(viewer, id) {
    if(!viewer.isAdmin()) {
      throw new ForbiddenError("You are not authorized to make this action.");
    }

    const genre = await this.model.findById(id);

    if(! genre) {
      throw new ModelNotFoundError("The genre you are requesting to remove doesnt exist");
    }

    return await genre.remove();
  }
}

IoC.singleton('genreRepository', ['genreModel'], GenreRepository);
