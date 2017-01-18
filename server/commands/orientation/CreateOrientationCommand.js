import IoC from 'AppIoC';
import ForbiddenError from 'errors/ForbiddenError';

export default class CreateOrientationCommand {
  constructor(orientationRepository) {
    this.orientationRepository = orientationRepository;
  }

  async execute(viewer, attrs) {
    return await this.orientationRepository.create(viewer, attrs);
  }
}

IoC.singleton('createOrientationCommand', ['orientationRepository'], CreateOrientationCommand);
