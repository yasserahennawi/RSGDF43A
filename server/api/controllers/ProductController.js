import Controller from './Controller';
import IoC from 'AppIoC';

export default class ProductController extends Controller {
  constructor(
    productRepository,
    createProductCommand,
    updateProductCommand,
    removeProductCommand,
    commandExecuter
  ) {
    super();
    this.productRepository = productRepository;
    this.createProductCommand = createProductCommand;
    this.updateProductCommand = updateProductCommand;
    this.removeProductCommand = removeProductCommand;
    this.commandExecuter = commandExecuter;
  }

  find(req, res, next) {
    this.productRepository.find(req.viewer, req.query)
      .then(result => this.successResponse(res, { result }))
      .then(null, next);
  }

  findById(req, res, next) {
    this.productRepository.findById(req.viewer, req.params.productId)
      .then(result => this.successResponse(res, { result }))
      .then(null, next);
  }

  create(req, res, next) {
    this.commandExecuter.execute(this.createProductCommand, req.viewer, req.body)
      .then(result => this.successResponse(res, { result }))
      .then(null, next);
  }

  update(req, res, next) {
    this.commandExecuter.execute(this.updateProductCommand, req.viewer, req.params.productId, req.body)
      .then(result => this.successResponse(res, { result }))
      .then(null, next);
  }

  remove(req, res, next) {
    this.commandExecuter.execute(this.removeProductCommand, req.viewer, req.params.productId)
      .then(result => this.successResponse(res, { result: { deleted: true, result: result._id } }))
      .then(null, next);
  }
}


IoC.singleton('productController', [
  'productRepository',
  'createProductCommand',
  'updateProductCommand',
  'removeProductCommand',
  'commandExecuter',
], ProductController)
