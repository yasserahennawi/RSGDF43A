import IoC from 'AppIoC';
import ForbiddenError from '../../errors/ForbiddenError';

export default class LoginUserCommand {
  constructor(authManager, userRepository) {
    this.authManager = authManager;
    this.userRepository = userRepository;
  }

  /**
   * Login user with email and password
   * @param  {Object} viewer
   * @param  {string} email
   * @param  {string} password
   * @return {Object}
   */
  async execute(viewer, email, password) {
    // Check if user already logged in
    if( !viewer.isGuest()) {
      throw new ForbiddenError("You are already logged in");
    }
    // Get viewer by email
    viewer = await this.userRepository.getViewer(email, password);
    // Consruct token from user
    const token = await this.authManager.constructToken(viewer);
    // Return viewer and token
    return {
      viewer,
      token,
    };
  }
}

IoC.singleton('loginUserCommand', ['authManager', 'userRepository'], LoginUserCommand);
