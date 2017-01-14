import { Schema } from 'mongoose';
import { checkEqualIds } from '../utils/mongo';
import uniqueValidator from 'mongoose-unique-validator';

import IoC from 'AppIoC';

export const genreModel = (mongoose) => {
  const genreSchema = new Schema({
    name: {type: String, required: true, unique: true},
    creator: {type: Schema.Types.ObjectId, ref: 'User', required:true},
  }, { timestamps: true });

  /**
   * Check if id is the same
   * @param {ObjectId} genre id
   * @return {boolean} true if the same genre
   */
  genreSchema.method('checkId', function(id) {
    return checkEqualIds(id, this._id);
  });

  /**
   * Get creator
   * @return {Object}
   */
  genreSchema.method('getCreator', async function() {
    await this.populate('creator').execPopulate();
    return this.creator;
  });

  genreSchema.plugin(uniqueValidator);

  return mongoose.model('Genre', genreSchema);
}

IoC.callable('genreModel', ['connection'], genreModel);
