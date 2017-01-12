import { Schema } from 'mongoose';
import passwordHash from 'password-hash-and-salt';
import ValidationError from '../errors/ValidationError';
import { checkEqualIds } from '../utils/mongo';
import Q from 'q';

export default (mongoose) => {
  const USER_TYPES = ['Blogger', 'Admin', 'Customer'];

  const userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    nickName: {type: String, required: true},

    email: {type: String, required: true},
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

    addressStreet: String,
    addressStreetNumber: String,
    addressComplement:String,
    addressZip: String,
    addressCountry: String,

    userType: {type: String, enum: USER_TYPES, required: true},

    onlineAt: {type: Date, default: Date.now},
  });

  userSchema.method('isAdmin', () => this.userType === 'Admin');
  userSchema.method('isGuest', () => false);
  userSchema.method('isBlogger', () => this.userType === 'Blogger');
  userSchema.method('isCustomer', () => this.userType === 'Customer');

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

  return mongoose.model('User', userSchema);
}
