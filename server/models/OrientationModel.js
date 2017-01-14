import { Schema } from 'mongoose';
import { checkEqualIds } from '../utils/mongo';
import uniqueValidator from 'mongoose-unique-validator';
import IoC from 'AppIoC';

export const orientationModel = (mongoose) => {
  const orientationSchema = new Schema({
    name: {type: String, required: true, unique: true},
    creator: {type: Schema.Types.ObjectId, ref: 'User', required:true},
  }, { timestamps: true });

  /**
   * Check if id is the same
   * @param {ObjectId} orientation id
   * @return {boolean} true if the same orientation
   */
  orientationSchema.method('checkId', function(id) {
    return checkEqualIds(id, this._id);
  });

  /**
   * Get creator
   * @return {Object}
   */
  orientationSchema.method('getCreator', async function() {
    await this.populate('creator').execPopulate();
    return this.creator;
  });

  orientationSchema.plugin(uniqueValidator);

  return mongoose.model('Orientation', orientationSchema);
}

IoC.callable('orientationModel', ['connection'], orientationModel);
