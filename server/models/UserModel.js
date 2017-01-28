import { Schema } from 'mongoose';
import passwordHash from 'password-hash-and-salt';
import ValidationError from 'errors/ValidationError';
import { checkEqualIds } from 'utils/mongo';
import Q from 'q';
import * as _ from 'lodash';
import uniqueValidator from 'mongoose-unique-validator';
import IoC from 'AppIoC';

export const userModel = (mongoose, userValidator) => {
  const USER_TYPES = ['blogger', 'publisher', 'admin', 'customer', 'super'];
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

    bankAccountEncrypted: {
      accountNumber: String,
      bic: String,
      bankName: String,
    },

    preferences: {
      // @TODO @kareemmohamed Add nutrition or genre
      ingredients: [{type: Schema.Types.ObjectId, ref: 'Ingredient'}],
      orientations: [{type: Schema.Types.ObjectId, ref: 'Orientation'}],
      balancedPercentage: Number,
      healthyPercentage: Number,
      alergies: [{type: Schema.Types.ObjectId, ref: 'Ingredient'}],
      mealType: {type: String, enum: MEAL_TYPES},
      rejectedRecipes: [{type: Schema.Types.ObjectId, ref: 'Recipe'}],
    },

    // Used for publisher type only
    company: String,

    addressStreet: String,
    addressStreetNumber: String,
    addressComplement:String,
    addressZip: String,
    addressCountry: String,
    addressCity: String,

    userType: {type: String, enum: USER_TYPES, required: true, default: 'Customer'},

    onlineAt: {type: Date, default: Date.now},
  }, { timestamps: true, collection: 'new_users' });

  userSchema.method('checkUserType', function(type) {
    return this.userType.toLowerCase() === type.toLowerCase();
  });

  userSchema.method('isAdmin', function() { return this.checkUserType('admin') || this.isSuper(); });
  userSchema.method('isSuper', function() { return this.checkUserType('super'); });
  userSchema.method('isGuest', function() { return false; });
  userSchema.method('isPublisher', function() { return this.checkUserType('publisher'); });
  userSchema.method('isBlogger', function() { return this.checkUserType('blogger'); });
  userSchema.method('isCustomer', function() { return this.checkUserType('customer'); });

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
   * Get rejected recipes ids
   * @param {Array} array of rejected recipes ids
   */
  userSchema.method('getRejectedRecipeIds', function() {
    return this.preferences.rejectedRecipes;
  });

  /**
   * Check if user has this orientation in his preferences
   * @param {Boolean}
   */
  userSchema.method('hasOrientation', function(orientation) {
    return _.findIndex(
      this.preferences.orientations,
      orientationId => checkEqualIds(orientationId, orientation)
    ) > -1;
  });

  /**
   * Check if user has a rejected recipe
   * @param {Boolean}
   */
  userSchema.method('hasRejectedRecipe', function(recipe) {
    return _.findIndex(
      this.getRejectedRecipeIds(),
      rejectedRecipeId => checkEqualIds(rejectedRecipeId, recipe)
    ) > -1;
  });

  /**
   * Check if user has this ingredient
   * @param {Boolean}
   */
  userSchema.method('hasIngredient', function(ingredient) {
    return _.findIndex(
      this.preferences.ingredients,
      ingredientId => checkEqualIds(ingredientId, ingredient)
    ) > -1;
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

    this.userType = this.userType.toLowerCase();

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

  userSchema.pre("save", async function(next) {
    await userValidator.validate(this);
    next();
  });

  return mongoose.model('User', userSchema);
}

IoC.callable('userModel', ['connection', 'userValidator'], userModel);
