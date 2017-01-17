import IoC from 'AppIoC';
import ForbiddenError from '../../errors/ForbiddenError';

export default class CreateUserCommand {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(viewer, {
    name,
  }) {
    return await this.userRepository.create(viewer, {
      name
    });
  }
}

IoC.singleton('createUserCommand', ['userRepository'], CreateUserCommand);
