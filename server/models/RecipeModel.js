import { Schema } from 'mongoose';
import { checkEqualIds } from 'utils/mongo';
import IoC from 'AppIoC';

export const MEAL_TYPES = ['dinner', 'launch', 'breakfast'];

export const recipeModel = (mongoose, recipeValidator) => {

  const recipeSchema = new Schema({
    name: {type: String, required: true},
    number: Number,
    preparationInstructions: [String],
    preparationTimeMin: Number,
    calories: String,
    difficulity: Number,
    mainImage: {
      // Original image
      src: String,
      // Image resized versions
      versions: [{
        src: String,
        width: Number,
        height: Number,
      }],
    },
    mealType: {type: String, enum: MEAL_TYPES, default: 'breakfast'},
    product: {type: Schema.Types.ObjectId, ref: 'Product'},
    // Is this nutrition or genre ????/
    // @TODO: @kareemmohamed update this with nutrition or genre
    nutrition: {type: Schema.Types.ObjectId, ref: 'Nutrition'},
    orientation: {type: Schema.Types.ObjectId, ref: 'Orientation'},
    items: [{
      addition: {type: Schema.Types.ObjectId, ref: 'Ingredient'},
      ingredient: {type: Schema.Types.ObjectId, ref: 'Ingredient', required: true},
      quantity: {type: Number, required: true},
      unit: {type: String, enum: [ 'mg' ,'g', 'el', 'tl', 'ml' ], default: 'mg'},
    }],
    creator: {type: Schema.Types.ObjectId, ref: 'User', required:true},
  }, { timestamps: true, collection: 'new_recipes' });

  /**
   * Get all items for this recipe with ingredient and addition populated
   * @return {Array}
   */
  recipeSchema.method('getItems', async function() {
    await this.populate('items.ingredient')
      .populate('items.addition')
      .execPopulate();
    return this.items;
  });

  /**
   * Get all nutritions for this recipe
   * @return {Object}
   */
  recipeSchema.method('getNutrition', async function() {
    await this.populate('nutrition').execPopulate();
    return this.nutrition;
  });

  /**
   * Get all nutritions for this recipe
   * @return {Object}
   */
  recipeSchema.method('getOrientation', async function() {
    await this.populate('orientation').execPopulate();
    return this.orientation;
  });

  /**
   * Get product for this recipe
   * @return {Object}
   */
  recipeSchema.method('getProduct', async function() {
    await this.populate('product').execPopulate();
    return this.product;
  });

  /**
   * Sync. method to get ingredient ids
   * @return {Array}
   */
  recipeSchema.method('getIngredientIds', function() {
    return this.items.map(item => item.ingredient);
  });

  /**
   * Check if id is the same
   * @param {ObjectId} recipe id
   * @return {boolean} true if the same recipe
   */
  recipeSchema.method('checkId', function(id) {
    return checkEqualIds(id, this._id);
  });

  /**
   * Get creator
   * @return {Object}
   */
  recipeSchema.method('getCreator', async function() {
    await this.populate('creator').execPopulate();
    return this.creator;
  });

  recipeSchema.pre("save", async function(next) {
    await recipeValidator.validate(this);
    next();
  });

  return mongoose.model('Recipe', recipeSchema);
}

IoC.callable('recipeModel', ['connection', 'recipeValidator'], recipeModel);
