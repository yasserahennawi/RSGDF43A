import IoC from 'AppIoC';
import ForbiddenError from 'errors/ForbiddenError';

export default class UpdateUserCommand {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  /**
   * @param {Object} viewer Viewer trying to update profile
   * @param {Object} attrs user profile attributes you want to update
   * @return {Promise} promise resolve with the updated user object
   */
  async execute(viewer, userId, attrs) {
    return await this.userRepository.update(viewer, userId, attrs);
  }
}

IoC.singleton('updateUserCommand', ['userRepository'], UpdateUserCommand);
