import Controller from './Controller';
import IoC from 'AppIoC';

export default class UserController extends Controller {
  constructor(
    userRepository,
    loginUserCommand,
    registerUserCommand,
    updateUserCommand,
    removeUserCommand,
    commandExecuter
  ) {
    super();
    this.userRepository = userRepository;
    this.loginUserCommand = loginUserCommand;
    this.registerUserCommand = registerUserCommand;
    this.updateUserCommand = updateUserCommand;
    this.removeUserCommand = removeUserCommand;
    this.commandExecuter = commandExecuter;
  }

  find(req, res, next) {
    this.userRepository.find(req.viewer, req.query)
      .then(result => this.successResponse(res, { result }))
      .then(null, next);
  }

  findById(req, res, next) {
    this.userRepository.findById(req.viewer, req.params.id)
      .then(result => this.successResponse(res, { result }))
      .then(null, next);
  }

  login(req, res, next) {
    this.commandExecuter.execute(this.loginUserCommand, req.viewer, req.body.email, req.body.password)
      .then(({ viewer, token }) => this.successResponse(res, { result: viewer, token }))
      .then(null, next)
  }

  viewer(req, res, next) {
    this.successResponse(res, req.viewer);
  }

  create(req, res, next) {
    this.commandExecuter.execute(this.registerUserCommand, req.viewer, req.body)
      .then(result => this.successResponse(res, { result }))
      .then(null, next);
  }

  update(req, res, next) {
    this.commandExecuter.execute(this.updateUserCommand, req.viewer, req.params.id, req.body)
      .then(result => this.successResponse(res, { result }))
      .then(null, next);
  }

  remove(req, res, next) {
    this.commandExecuter.execute(this.removeUserCommand, req.viewer, req.params.id)
      .then(result => this.successResponse(res, { result }))
      .then(null, next);
  }
}


IoC.singleton('userController', [
  'userRepository',
  'loginUserCommand',
  'registerUserCommand',
  'updateUserCommand',
  'updateUserCommand', // @TODO
  'commandExecuter',
], UserController)
