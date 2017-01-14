import IoC from 'AppIoC';
import ForbiddenError from '../../errors/ForbiddenError';

export default class UpdateUserCommand {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  /**
   * @param {Object} viewer Viewer trying to update profile
   * @param {Object} attrs user profile attributes you want to update
   * @return {Promise} promise resolve with the updated user object
   */
  async execute(viewer, userId, {
    firstName,
    lastName,
    nickName,
    addressStreet,
    addressStreetNumber,
    addressComplement,
    addressZipcode,
    addressCountry,
  }) {
    // If not the same blogger nor an admin then reject
    if(view.isGuest() || !viewer.isAdmin() && (!viewer.isBlogger() || !viewer.checkId(userId))) {
      throw new ForbiddenError('Not authorized to do this action!');
    }

    // If the user is trying to update his password then we have to check his old password
    if(password) {
      await this.verifyPassword(oldPassword);
    }

    await this.userRepository.update(userId, {
      firstName,
      lastName,
      nickName,
      password,
      addressStreet,
      addressStreetNumber,
      addressComplement,
      addressZipcode,
      addressCountry,
    });

    return this.save();
  }
}

IoC.singleton('updateUserCommand', ['userRepository'], UpdateUserCommand);
