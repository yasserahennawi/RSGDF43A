import IoC from 'AppIoC';
import ForbiddenError from '../../errors/ForbiddenError';

export default class CreateProductCommand {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(viewer, {
    name,
  }) {
    return await this.productRepository.create(viewer, {
      name
    });
  }
}

IoC.singleton('createProductCommand', ['productRepository'], CreateProductCommand);
