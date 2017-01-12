import ForbiddenError from '../../errors/ForbiddenError';

export default class RegisterUserCommand {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  generateNewPassword(){
    return Math.random().toString(36).slice(-8);
  }

  /**
   * @param {Object} viewer Viewer trying to update profile
   * @param {Object} attrs user profile attributes you want to update
   * @return {Promise} promise resolve with the updated user object
   */
  async execute(viewer, userType, {
    email,
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
    if(view.isGuest() || !viewer.isAdmin()) {
      throw new ForbiddenError('Not authorized to do this action!');
    }

    let password = await this.generateNewPassword();

    await this.userRepository.create({
      email,
      firstName,
      lastName,
      nickName,
      addressStreet,
      addressStreetNumber,
      addressComplement,
      addressZipcode,
      addressCountry,
    });

    await console.log("Sending email");
  }
}
