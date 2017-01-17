import Controller from './Controller';
import IoC from 'AppIoC';

export default class RecipeController extends Controller {
  constructor(
    recipeRepository,
    createRecipeCommand,
    updateRecipeCommand,
    removeRecipeCommand,
    refreshRecipeCommand,
    commandExecuter
  ) {
    super();
    this.recipeRepository = recipeRepository;
    this.createRecipeCommand = createRecipeCommand;
    this.updateRecipeCommand = updateRecipeCommand;
    this.removeRecipeCommand = removeRecipeCommand;
    this.refreshRecipeCommand = refreshRecipeCommand;
    this.commandExecuter = commandExecuter;
  }

  find(req, res, next) {
    this.recipeRepository.find(req.viewer, req.query)
      .then(result => this.successResponse(res, { result }))
      .then(null, next);
  }

  findById(req, res, next) {
    this.recipeRepository.findById(req.viewer, req.params.recipeId)
      .then(result => this.successResponse(res, { result }))
      .then(null, next);
  }

  getDailyRecipes(req, res, next) {
    this.recipeRepository.getDailyRecipes(req.viewer, req.query.noOfDays)
      .then(result => this.successResponse(res, { result }))
      .then(null, next);
  }

  refresh(req, res, next) {
    this.commandExecuter.execute(this.refreshRecipeCommand, req.viewer, req.params.recipeId)
      .then(result => this.successResponse(res, { result }))
      .then(null, next);
  }

  create(req, res, next) {
    this.commandExecuter.execute(this.createRecipeCommand, req.viewer, req.body)
      .then(result => this.successResponse(res, { result }))
      .then(null, next);
  }

  update(req, res, next) {
    this.commandExecuter.execute(this.updateRecipeCommand, req.viewer, req.params.recipeId, req.body)
      .then(result => this.successResponse(res, { result }))
      .then(null, next);
  }

  remove(req, res, next) {
    this.commandExecuter.execute(this.removeRecipeCommand, req.viewer, req.params.recipeId)
      .then(result => this.successResponse(res, { result: { deleted: true, result: result._id } }))
      .then(null, next);
  }
}


IoC.singleton('recipeController', [
  'recipeRepository',
  'createRecipeCommand',
  'updateRecipeCommand',
  'removeRecipeCommand',
  'refreshRecipeCommand',
  'commandExecuter',
], RecipeController)
