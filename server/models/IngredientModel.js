import { Schema } from 'mongoose';
import { checkEqualIds } from 'utils/mongo';
import uniqueValidator from 'mongoose-unique-validator';
import IoC from 'AppIoC';

export const ingredientModel = (mongoose, ingredientValidator) => {
  const ingredientSchema = new Schema({
    name: {type: String, required: true, unique: true},
    category: {type: String},
    subCategory: {type: String},
    creator: {type: Schema.Types.ObjectId, ref: 'User', required:true},
  }, { timestamps: true, collection: 'new_ingredients' });

  /**
   * Check if id is the same
   * @param {ObjectId} ingredient id
   * @return {boolean} true if the same ingredient
   */
  ingredientSchema.method('checkId', function(id) {
    return checkEqualIds(id, this._id);
  });

  /**
   * Get creator
   * @return {Object}
   */
  ingredientSchema.method('getCreator', async function() {
    await this.populate('creator').execPopulate();
    return this.creator;
  });

  ingredientSchema.pre("save", async function(next) {
    try {
      await ingredientValidator.validate(this);
      next();
    } catch(err) {
      next(err);
    }
  });

  ingredientSchema.plugin(uniqueValidator);

  return mongoose.model('Ingredient', ingredientSchema);
}

IoC.callable('ingredientModel', ['connection', 'ingredientValidator'], ingredientModel);
