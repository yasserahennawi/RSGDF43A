import IoC from 'AppIoC';
import ForbiddenError from '../../errors/ForbiddenError';

export default class ProductSeederCommand {

  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(viewer) {
    if(!viewer.isSuper()) {
      throw new ForbiddenError("You are not authorized to do this action");
    }
  }
}

IoC.singleton('productSeederCommand', ['productRepository'], ProductSeederCommand);
