import IoC from 'AppIoC';
import ForbiddenError from '../../errors/ForbiddenError';

export default class UpdateProductCommand {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(viewer, productId, {
    name,
  }) {
    return await this.productRepository.update(viewer, productId, {
      name
    });
  }
}

IoC.singleton('updateProductCommand', ['productRepository'], UpdateProductCommand);
