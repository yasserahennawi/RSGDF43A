import IoC from 'AppIoC';
import ForbiddenError from '../../errors/ForbiddenError';

export default class CreateOrientationCommand {
  constructor(orientationRepository) {
    this.orientationRepository = orientationRepository;
  }

  async execute(viewer, {
    name,
  }) {
    return await this.orientationRepository.create(viewer, {
      name
    });
  }
}

IoC.singleton('createOrientationCommand', ['orientationRepository'], CreateOrientationCommand);
