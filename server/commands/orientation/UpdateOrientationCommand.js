import IoC from 'AppIoC';
import ForbiddenError from 'errors/ForbiddenError';

export default class UpdateOrientationCommand {
  constructor(orientationRepository) {
    this.orientationRepository = orientationRepository;
  }

  async execute(viewer, orientationId, attrs) {
    return await this.orientationRepository.update(viewer, orientationId, attrs);
  }
}

IoC.singleton('updateOrientationCommand', ['orientationRepository'], UpdateOrientationCommand);
