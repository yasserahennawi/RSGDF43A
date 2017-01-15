import Controller from './Controller';
import IoC from 'AppIoC';

export default class OrientationController extends Controller {
  constructor(
    orientationRepository,
    createOrientationCommand,
    updateOrientationCommand,
    removeOrientationCommand,
    commandExecuter
  ) {
    super();
    this.orientationRepository = orientationRepository;
    this.createOrientationCommand = createOrientationCommand;
    this.updateOrientationCommand = updateOrientationCommand;
    this.removeOrientationCommand = removeOrientationCommand;
    this.commandExecuter = commandExecuter;
  }

  find(req, res, next) {
    this.orientationRepository.find(req.viewer, req.query)
      .then(result => this.successResponse(res, { result }))
      .then(null, next);
  }

  findById(req, res, next) {
    this.orientationRepository.findById(req.viewer, req.params.orientationId)
      .then(result => this.successResponse(res, { result }))
      .then(null, next);
  }

  create(req, res, next) {
    this.commandExecuter.execute(this.createOrientationCommand, req.viewer, req.body)
      .then(result => this.successResponse(res, { result }))
      .then(null, next);
  }

  update(req, res, next) {
    this.commandExecuter.execute(this.updateOrientationCommand, req.viewer, req.params.orientationId, req.body)
      .then(result => this.successResponse(res, { result }))
      .then(null, next);
  }

  remove(req, res, next) {
    this.commandExecuter.execute(this.removeOrientationCommand, req.viewer, req.params.orientationId)
      .then(result => this.successResponse(res, { result: { deleted: true, result: result._id } }))
      .then(null, next);
  }
}


IoC.singleton('orientationController', [
  'orientationRepository',
  'createOrientationCommand',
  'updateOrientationCommand',
  'removeOrientationCommand',
  'commandExecuter',
], OrientationController)
