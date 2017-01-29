import Controller from './Controller';
import IoC from 'AppIoC';
import { getFullHostname } from 'utils/url';

export default class UserController extends Controller {
  constructor(
    userRepository,
    loginUserCommand,
    registerUserCommand,
    updateUserCommand,
    removeUserCommand,
    requestResetPasswordCommand,
    resetPasswordCommand,
    commandExecuter
  ) {
    super();
    this.userRepository = userRepository;
    this.loginUserCommand = loginUserCommand;
    this.registerUserCommand = registerUserCommand;
    this.updateUserCommand = updateUserCommand;
    this.removeUserCommand = removeUserCommand;
    this.requestResetPasswordCommand = requestResetPasswordCommand;
    this.resetPasswordCommand = resetPasswordCommand;
    this.commandExecuter = commandExecuter;
  }

  find(req, res, next) {
    this.userRepository.find(req.viewer, req.query)
      .then(result => this.successResponse(res, { result }))
      .then(null, next);
  }

  findById(req, res, next) {
    this.userRepository.findById(req.viewer, req.params.userId)
      .then(result => this.successResponse(res, { result }))
      .then(null, next);
  }

  login(req, res, next) {
    this.commandExecuter.execute(this.loginUserCommand, req.viewer, req.body.email, req.body.password)
      .then(({ viewer, token }) => this.successResponse(res, { result: viewer, token }))
      .then(null, next)
  }

  async requestResetPassword(req, res, next) {
    try {
      //
      const getResetPasswordUrl = key => getFullHostname(req) + `?reset=true&key=${key}`;
      // Execute request reset password command
      await this.commandExecuter.execute(this.requestResetPasswordCommand, req.viewer, req.body.email, getResetPasswordUrl);
      // success response
      this.successResponse(res, { message: "Email has been sent!" });
    } catch(err) {
      next(err);
    }
  }

  async resetPassword(req, res, next) {
    try {
      console.log(req.body);
      // Execute reset password command
      const user = await this.commandExecuter.execute(this.resetPasswordCommand, req.viewer, req.body.password, req.body.key);
      // success response
      this.successResponse(res, { result: user });
    } catch(err) {
      next(err);
    }
  }

  viewer(req, res, next) {
    this.successResponse(res, {result: req.viewer});
  }

  create(req, res, next) {
    this.commandExecuter.execute(this.registerUserCommand, req.viewer, req.body)
      .then(result => this.successResponse(res, { result }))
      .then(null, next);
  }

  update(req, res, next) {
    this.commandExecuter.execute(this.updateUserCommand, req.viewer, req.params.userId, req.body)
      .then(result => this.successResponse(res, { result }))
      .then(null, next);
  }

  remove(req, res, next) {
    // this.commandExecuter.execute(this.removeUserCommand, req.viewer, req.params.userId)
    //   .then(result => this.successResponse(res, { result }))
    //   .then(null, next);
  }
}


IoC.singleton('userController', [
  'userRepository',
  'loginUserCommand',
  'registerUserCommand',
  'updateUserCommand',
  'updateUserCommand', // @TODO
  'requestResetPasswordCommand',
  'resetPasswordCommand',
  'commandExecuter',
], UserController)
