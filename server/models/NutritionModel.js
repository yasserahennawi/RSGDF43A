import { Schema } from 'mongoose';
import { checkEqualIds } from '../utils/mongo';
import uniqueValidator from 'mongoose-unique-validator';
import IoC from 'AppIoC';

export const nutritionModel = (mongoose, nutritionValidator) => {
  const nutritionSchema = new Schema({
    name: {type: String, required: true, unique: true},
    creator: {type: Schema.Types.ObjectId, ref: 'User', required:true},
  }, { timestamps: true, collection: 'new_nutritions' });

  /**
   * Check if id is the same
   * @param {ObjectId} nutrition id
   * @return {boolean} true if the same nutrition
   */
  nutritionSchema.method('checkId', function(id) {
    return checkEqualIds(id, this._id);
  });

  /**
   * Get creator
   * @return {Object}
   */
  nutritionSchema.method('getCreator', async function() {
    await this.populate('creator').execPopulate();
    return this.creator;
  });

  nutritionSchema.plugin(uniqueValidator);

  nutritionSchema.pre("save", async function(next) {
    await nutritionValidator.validate(this);
    next();
  });

  return mongoose.model('Nutrition', nutritionSchema);
}

IoC.callable('nutritionModel', ['connection', 'nutritionValidator'], nutritionModel);
