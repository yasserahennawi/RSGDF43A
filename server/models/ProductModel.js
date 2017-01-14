import { Schema } from 'mongoose';
import { checkEqualIds } from '../utils/mongo';
import uniqueValidator from 'mongoose-unique-validator';
import IoC from 'AppIoC';

export const productModel = (mongoose) => {
  const PRODUCT_STATUSES = ['accepted', 'rejected', 'awaiting'];

  const productSchema = new Schema({
    name: {type: String, required: true, unique: true},
    price: {
      value: {type: Number, required: true},
      currency: {type: String, required: true},
    },
    coverImage: {
      // Original image
      src: String,
      // Image resized versions
      versions: [{
        src: String,
        width: Number,
        height: Number,
      }],
    },
    status: {type: String, enum: PRODUCT_STATUSES, default: 'awaiting'},
    recipes: [{type: Schema.Types.ObjectId, ref: 'Recipe'}],
    genres: [{type: Schema.Types.ObjectId, ref: 'Genre'}],
    nutritions: [{type: Schema.Types.ObjectId, ref: 'Nutrition'}],
    creator: {type: Schema.Types.ObjectId, ref: 'User', required:true},
    author: {type: Schema.Types.ObjectId, ref: 'User'},
  }, { timestamps: true });

  /**
   * Check if product is accepted
   * @return {Boolean}
   */
  productSchema.method('isAccepted', function() {
    return this.status === 'accepted';
  });

  /**
   * Check if product is rejected
   * @return {Boolean}
   */
  productSchema.method('isRejected', function() {
    return this.status === 'rejected';
  });

  /**
   * Check if product is awaiting
   * @return {Boolean}
   */
  productSchema.method('isAwaiting', function() {
    return this.status === 'awaiting';
  });

  /**
   * Check if id is the same
   * @param {ObjectId} product id
   * @return {boolean} true if the same product
   */
  productSchema.method('checkId', function(id) {
    return checkEqualIds(id, this._id);
  });

  /**
   * Get all genres for this product
   * @return {Array}
   */
  productSchema.method('getGenres', async function() {
    await this.populate('genres').execPopulate();
    return this.genres;
  });

  /**
   * Get all recipes for this product
   * @return {Array}
   */
  productSchema.method('getRecipes', async function() {
    await this.populate('recipes').execPopulate();
    return this.recipes;
  });

  /**
   * Get all nutritions for this product
   * @return {Array}
   */
  productSchema.method('getNutritions', async function() {
    await this.populate('nutritions').execPopulate();
    return this.nutritions;
  });

  /**
   * Get creator
   * @return {Object}
   */
  productSchema.method('getCreator', async function() {
    await this.populate('creator').execPopulate();
    return this.creator;
  });

  /**
   * Get product author
   * @return {Object}
   */
  productSchema.method('getAuthor', async function() {
    await this.populate('author').execPopulate();
    return this.author;
  });

  productSchema.plugin(uniqueValidator);

  return mongoose.model('Product', productSchema);
}

IoC.callable('productModel', ['connection'], productModel);
