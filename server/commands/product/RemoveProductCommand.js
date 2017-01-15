import IoC from 'AppIoC';
import ForbiddenError from '../../errors/ForbiddenError';

export default class RemoveProductCommand {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(viewer, productId) {
    return await this.productRepository.remove(viewer, productId);
  }
}

IoC.singleton('removeProductCommand', ['productRepository'], RemoveProductCommand);
