import Repository from './Repository';
import ValidationError from  '../errors/ValidationError';
import ForbiddenError from  '../errors/ForbiddenError';
import IoC from 'AppIoC';

export default class UserRepository extends Repository {
  constructor(model, secretKey) {
    super();
    this.model = model;
    this.secretKey = secretKey;
  }

  getSuperUser() {
    return this.model.findOne({ email: "superUserMaintenance@tastetastic.com" }).exec();
  }

  createSuperUser() {
    return this.model.create({
      email: "superUserMaintenance@tastetastic.com",
      // It's very important to create a strong password here that no one can figure out
      password: new Buffer(this.secretKey).toString('base64'),
      firstName: "Super",
      lastName: "User",
      userType: 'Super',
    });
  }

  find(viewer, {
    // All queries available for users
    email,
  }) {
    if(viewer.isGuest()) {
      throw new ForbiddenError("You dont have access to view users");
    }

    const query = this.mdoel.find();

    if(email) {
      query.where('email', email);
    }

    return query.exec();
  }

  findById(viewer, id) {
    return this.model.findById(id).exec();
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

IoC.singleton('userRepository', [
  'userModel',
  'secretKey'
], UserRepository);
