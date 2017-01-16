import { Schema } from 'mongoose';
import passwordHash from 'password-hash-and-salt';
import ValidationError from '../errors/ValidationError';
import { checkEqualIds } from '../utils/mongo';
import Q from 'q';
import * as _ from 'lodash';
import uniqueValidator from 'mongoose-unique-validator';
import IoC from 'AppIoC';

export const userModel = (mongoose) => {
  const USER_TYPES = ['Blogger', 'Admin', 'Customer', 'Super'];
  const MEAL_TYPES = ['dinner', 'launch', 'breakfast'];

  const userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    nickName: {type: String, required: true},

    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},

    profileImage: {
      // Original image
      src: String,
      // Image resized versions
      versions: [{
        src: String,
        width: Number,
        height: Number,
      }],
    },

    preferences: {
      genre: {type: Schema.Types.ObjectId, ref: 'Genre'},
      orientation: {type: Schema.Types.ObjectId, ref: 'Orientation'},
      balancedPercentage: Number,
      healthyPercentage: Number,
      alergies: [{type: Schema.Types.ObjectId, ref: 'Ingredient'}],
      mealType: {type: String, enum: MEAL_TYPES},
    },

    addressStreet: String,
    addressStreetNumber: String,
    addressComplement:String,
    addressZip: String,
    addressCountry: String,

    userType: {type: String, enum: USER_TYPES, required: true, default: 'Customer'},

    onlineAt: {type: Date, default: Date.now},
  }, { timestamps: true, collection: 'new_users' });

  userSchema.method('isAdmin', function() { return this.userType === 'Admin' || this.isSuper(); });
  userSchema.method('isSuper', function() { return this.userType === 'Super'; });
  userSchema.method('isGuest', function() { return false; });
  userSchema.method('isBlogger', function() { return this.userType === 'Blogger'; });
  userSchema.method('isCustomer', function() { return this.userType === 'Customer'; });

  /**
   * Check if id is the same
   * @param {ObjectId} user id
   * @return {boolean} true if the same user
   */
  userSchema.method('checkId', function(id) {
    return checkEqualIds(id, this._id);
  });

  /**
   * Hash user password
   * @param {string} password user input password
   */
  userSchema.method('hashPassword', async function(password) {
    this.password = await Q.ninvoke(passwordHash(password), 'hash');
  });

  /**
   * Check if password is correct
   * @param {string} password input password
   * @return {boolean} whether password is correct or not
   */
  userSchema.method('verifyPassword', async function(password) {
    if(! password) {
      return false;
    }

    return Q.ninvoke(passwordHash(password), 'verifyAgainst', this.password);
  });

  /**
   * Pre validate middleware
   * - Add default values
   * @param {Function} next
   */
  userSchema.pre('validate', function(next) {
    // Default values
    if(! this.nickName && this.firstName && this.lastName) {
      this.nickName = this.firstName.charAt(0).toLowerCase() + _.upperFirst(this.lastName);
    }

    next();
  });

  /**
   * Pre save middleware
   * - Hash password if it has been modified
   * @param {Function} next
   */
  userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
      await this.hashPassword(this.password);
    }

    next();
  });

  userSchema.plugin(uniqueValidator);

  return mongoose.model('User', userSchema);
}

IoC.callable('userModel', ['connection'], userModel);
