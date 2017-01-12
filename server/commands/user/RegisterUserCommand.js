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
  async execute(viewer, {
    email,
    userType,
    firstName,
    lastName,
    nickName,
    addressStreet,
    addressStreetNumber,
    addressComplement,
    addressZipcode,
    addressCountry,
  }) {
    let password = await this.generateNewPassword();

    const user = await this.userRepository.create(viewer, {
      email,
      userType,
      password,
      firstName,
      lastName,
      nickName,
      addressStreet,
      addressStreetNumber,
      addressComplement,
      addressZipcode,
      addressCountry,
    });

    await console.log("Sending email", user, password);
    return user;
  }
}
