import { Schema } from 'mongoose';
import { checkEqualIds } from 'utils/mongo';
import uniqueValidator from 'mongoose-unique-validator';
import IoC from 'AppIoC';

export const orientationModel = (mongoose, orientationValidator) => {
  const orientationSchema = new Schema({
    name: {type: String, required: true, unique: true},
    creator: {type: Schema.Types.ObjectId, ref: 'User', required:true},
  }, { timestamps: true, collection: 'new_orientations' });

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

  orientationSchema.pre("save", async function(next) {
    try {
      await orientationValidator.validate(this);
      next();
    } catch(err) {
      next(err);
    }
  });

  return mongoose.model('Orientation', orientationSchema);
}

IoC.callable('orientationModel', ['connection', 'orientationValidator'], orientationModel);
