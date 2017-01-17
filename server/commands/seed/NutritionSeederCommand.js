import IoC from 'AppIoC';
import ForbiddenError from '../../errors/ForbiddenError';

export default class NutritionSeederCommand {

  constructor(nutritionRepository) {
    this.nutritionRepository = nutritionRepository;
  }

  getData() {
    return [
      { name: 'Mit fleisch' },
      { name: 'Vegetarisch' },
      { name: 'Pescetarisch' },
      { name: 'Vegan' },
    ];
  }

  async execute(viewer) {
    if(!viewer.isSuper()) {
      throw new ForbiddenError("You are not authorized to do this action");
    }

    return await this.nutritionRepository.createAll(viewer, this.getData());
  }
}

IoC.singleton('nutritionSeederCommand', ['nutritionRepository'], NutritionSeederCommand);
