import IoC from 'AppIoC';
import ForbiddenError from '../../errors/ForbiddenError';

export default class RemoveUserCommand {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(viewer, userId) {
    return await this.userRepository.remove(viewer, userId);
  }
}

IoC.singleton('removeUserCommand', ['userRepository'], RemoveUserCommand);
