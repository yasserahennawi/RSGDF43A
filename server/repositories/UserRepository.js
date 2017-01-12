import Repository from './Repository';
import ValidationError from  '../errors/ValidationError';
import ForbiddenError from  '../errors/ForbiddenError';

export default class UserRepository extends Repository {
  constructor(model) {
    super();
    this.model = model;
  }

  findById(viewer, id) {
    return this.model.findById(id).exec();
  }

  findByEmail(viewer, email) {
    return this.model.findOne({ email }).exec();
  }

  getOwner(id) {
    return this.model.findOne({ _id: id }).exec();
  }

  async getViewer(email, password) {
    // Get user by email
    const user = await this.model.findOne({ email }).exec();
    // Throw error if he doesnt exist
    if(! user) {
      throw new ValidationError({ email: "No user with this email" });
    }
    // Check the user password
    const verified = await user.verifyPassword(password);
    // Throw error if password is incorrect
    if(! verified) {
      throw new ValidationError({ password: "Password is incorrect" });
    }
    return user;
  }

  create(viewer, data) {
    if(!viewer.isAdmin()) {
      throw new ForbiddenError("You are not authorized to make this action.");
    }
    return this.model.create(data);
  }

  update(viewer, id, data) {
    if(!viewer.isAdmin() && !viewer.checkId(id)) {
      throw new ForbiddenError("You are not authorized to make this action.");
    }
    const user = this.model.findById({ _id: id }).exec();
    return user.save();
  }

  remove(viewer, id) {
    if(!viewer.isAdmin()) {
      throw new ForbiddenError("You are not authorized to make this action.");
    }
    const user = this.model.findById({ _id: id }).exec();
    return user.remove();
  }
}
