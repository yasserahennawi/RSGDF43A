import Controller from './Controller';
import IoC from 'AppIoC';

export default class NutritionController extends Controller {
  constructor(
    nutritionRepository,
    createNutritionCommand,
    updateNutritionCommand,
    removeNutritionCommand,
    commandExecuter
  ) {
    super();
    this.nutritionRepository = nutritionRepository;
    this.createNutritionCommand = createNutritionCommand;
    this.updateNutritionCommand = updateNutritionCommand;
    this.removeNutritionCommand = removeNutritionCommand;
    this.commandExecuter = commandExecuter;
  }

  find(req, res, next) {
    this.nutritionRepository.find(req.viewer, req.query)
      .then(result => this.successResponse(res, { result }))
      .then(null, next);
  }

  findById(req, res, next) {
    this.nutritionRepository.findById(req.viewer, req.params.nutritionId)
      .then(result => this.successResponse(res, { result }))
      .then(null, next);
  }

  create(req, res, next) {
    this.commandExecuter.execute(this.createNutritionCommand, req.viewer, req.body)
      .then(result => this.successResponse(res, { result }))
      .then(null, next);
  }

  update(req, res, next) {
    this.commandExecuter.execute(this.updateNutritionCommand, req.viewer, req.params.nutritionId, req.body)
      .then(result => this.successResponse(res, { result }))
      .then(null, next);
  }

  remove(req, res, next) {
    this.commandExecuter.execute(this.removeNutritionCommand, req.viewer, req.params.nutritionId)
      .then(result => this.successResponse(res, { result: { deleted: true, result: result._id } }))
      .then(null, next);
  }
}


IoC.singleton('nutritionController', [
  'nutritionRepository',
  'createNutritionCommand',
  'updateNutritionCommand',
  'removeNutritionCommand',
  'commandExecuter',
], NutritionController)
