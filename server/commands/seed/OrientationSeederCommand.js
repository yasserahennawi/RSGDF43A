import IoC from 'AppIoC';
import ForbiddenError from 'errors/ForbiddenError';

export default class OrientationSeederCommand {

  constructor(orientationRepository) {
    this.orientationRepository = orientationRepository;
  }

  getData() {
    return [
      { name: 'Schmackhaft und Abwechslungsreich' },
      { name: 'Gesund' },
      { name: 'Abnehmen' },
      { name: 'Muskelaufbau' },
    ];
  }

  async execute(viewer) {
    if(!viewer.isSuper()) {
      throw new ForbiddenError("You are not authorized to do this action");
    }

    return await this.orientationRepository.createAll(viewer, this.getData());
  }
}

IoC.singleton('orientationSeederCommand', ['orientationRepository'], OrientationSeederCommand);
