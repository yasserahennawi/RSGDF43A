import Controller from './Controller';
import IoC from 'AppIoC';

export default class IngredientController extends Controller {
  constructor(
    ingredientRepository,
    createIngredientCommand,
    updateIngredientCommand,
    removeIngredientCommand,
    commandExecuter
  ) {
    super();
    this.ingredientRepository = ingredientRepository;
    this.createIngredientCommand = createIngredientCommand;
    this.updateIngredientCommand = updateIngredientCommand;
    this.removeIngredientCommand = removeIngredientCommand;
    this.commandExecuter = commandExecuter;
  }

  find(req, res, next) {
    this.ingredientRepository.find(req.viewer, req.query)
      .then(result => this.successResponse(res, { result }))
      .then(null, next);
  }

  findById(req, res, next) {
    this.ingredientRepository.findById(req.viewer, req.params.ingredientId)
      .then(result => this.successResponse(res, { result }))
      .then(null, next);
  }

  create(req, res, next) {
    this.commandExecuter.execute(this.createIngredientCommand, req.viewer, req.body)
      .then(result => this.successResponse(res, { result }))
      .then(null, next);
  }

  update(req, res, next) {
    this.commandExecuter.execute(this.updateIngredientCommand, req.viewer, req.params.ingredientId, req.body)
      .then(result => this.successResponse(res, { result }))
      .then(null, next);
  }

  remove(req, res, next) {
    this.commandExecuter.execute(this.removeIngredientCommand, req.viewer, req.params.ingredientId)
      .then(result => this.successResponse(res, { result: { deleted: true, result: result._id } }))
      .then(null, next);
  }
}


IoC.singleton('ingredientController', [
  'ingredientRepository',
  'createIngredientCommand',
  'updateIngredientCommand',
  'removeIngredientCommand',
  'commandExecuter',
], IngredientController)
