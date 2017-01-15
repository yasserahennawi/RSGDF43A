import IoC from 'AppIoC';
import ForbiddenError from '../../errors/ForbiddenError';

export default class RemoveOrientationCommand {
  constructor(orientationRepository) {
    this.orientationRepository = orientationRepository;
  }

  async execute(viewer, orientationId) {
    return await this.orientationRepository.remove(viewer, orientationId);
  }
}

IoC.singleton('removeOrientationCommand', ['orientationRepository'], RemoveOrientationCommand);
