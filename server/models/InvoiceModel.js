import { Schema } from 'mongoose';
import { checkEqualIds } from '../utils/mongo';
import IoC from 'AppIoC';

export const invoiceModel = (mongoose) => {
  const invoiceSchema = new Schema({
    totalPrice: {
      value: {type: Number, required: true},
      currency: {type: String, required: true},
    },
    quantity: {type: Number, required: true},
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
    creator: {type: Schema.Types.ObjectId, ref: 'User', required:true},
  }, { timestamps: true });

  /**
   * Check if id is the same
   * @param {ObjectId} invoice id
   * @return {boolean} true if the same invoice
   */
  invoiceSchema.method('checkId', function(id) {
    return checkEqualIds(id, this._id);
  });

  /**
   * Get creator user
   * @return {Object} creator user object
   */
  invoiceSchema.method('getCreator', async function() {
    await this.populate('creator').execPopulate();
    return this.creator;
  });

  /**
   * Get products in the invoice
   * @return {Array} products
   */
  invoiceSchema.method('getProducts', async function() {
    await this.populate('products').execPopulate();
    return this.products;
  });

  return mongoose.model('Invoice', invoiceSchema);
}

IoC.callable('invoiceModel', ['connection'], invoiceModel);
