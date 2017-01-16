import IoC from 'AppIoC';
import ForbiddenError from '../../errors/ForbiddenError';

export default class CreateProductCommand {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(viewer, attrs) {
    return await this.productRepository.create(viewer, attrs);
  }
}

IoC.singleton('createProductCommand', ['productRepository'], CreateProductCommand);
