import IoC from 'AppIoC';
import ForbiddenError from '../../errors/ForbiddenError';

export default class UpdateProductCommand {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(viewer, productId, attrs) {
    return await this.productRepository.update(viewer, productId, attrs);
  }
}

IoC.singleton('updateProductCommand', ['productRepository'], UpdateProductCommand);
