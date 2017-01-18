import Repository from './Repository';
import ValidationError from  'errors/ValidationError';
import ForbiddenError from  'errors/ForbiddenError';
import UnauthorizedError from  'errors/UnauthorizedError';
import IoC from 'AppIoC';
import * as _ from 'lodash';
import { getUniqueIds } from 'utils/mongo';

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
      throw new UnauthorizedError();
    }

    const query = this.model.find();

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
    // Only admins can create different types of users
    if((data.userType && data.userType !== 'Customer') && !viewer.isAdmin()) {
      throw new ForbiddenError("You are not authorized to make this action.");
    }
    return this.model.create(data);
  }

  async update(viewer, id, data) {

    // Check for old password here
    // If the user is trying to update his password then we have to check his old password
    // if(password) {
    //   await this.verifyPassword(oldPassword);
    // }

    // Only admins can update userType
    if((data.userType && data.userType !== 'Customer') && !viewer.isAdmin()) {
      throw new ForbiddenError("Only admins can change the user type.");
    }

    if(!viewer.isAdmin() && !viewer.checkId(id)) {
      throw new ForbiddenError("You are not authorized to make this action.");
    }
    const user = await this.model.findById({ _id: id }).exec();
    return user.set(data).save();
  }

  rejectRecipe(viewer, recipeId) {
    if(viewer.isGuest()) {
      throw new UnauthorizedError();
    }
    return this.update(viewer, viewer._id, {
      preferences: {
        rejectedRecipes: getUniqueIds([...viewer.preferences.rejectedRecipes, recipeId])
      },
    })
  }

  async remove(viewer, id) {
    if(!viewer.isAdmin()) {
      throw new ForbiddenError("You are not authorized to make this action.");
    }
    const user = await this.model.findById({ _id: id }).exec();
    return user.remove();
  }
}

IoC.singleton('userRepository', [
  'userModel',
  'secretKey'
], UserRepository);
