import IoC from 'AppIoC';
import ForbiddenError from '../../errors/ForbiddenError';

export default class UpdateOrientationCommand {
  constructor(orientationRepository) {
    this.orientationRepository = orientationRepository;
  }

  async execute(viewer, orientationId, {
    name,
  }) {
    return await this.orientationRepository.update(viewer, orientationId, {
      name
    });
  }
}

IoC.singleton('updateOrientationCommand', ['orientationRepository'], UpdateOrientationCommand);
