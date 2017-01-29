import IoC from 'AppIoC';
import ForbiddenError from 'errors/ForbiddenError';

export default class ResetPasswordCommand {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(viewer, newPassword, key) {
    const user = await this.userRepository.resetPassword(
      viewer,
      newPassword,
      key
    );


    return user;
  }
}

IoC.singleton('resetPasswordCommand', ['userRepository'], ResetPasswordCommand);
