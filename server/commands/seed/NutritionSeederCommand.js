import IoC from 'AppIoC';
import ForbiddenError from '../../errors/ForbiddenError';

export default class NutritionSeederCommand {

  constructor(nutritionRepository) {
    this.nutritionRepository = nutritionRepository;
  }

  async execute(viewer) {
    if(!viewer.isSuper()) {
      throw new ForbiddenError("You are not authorized to do this action");
    }

    return await this.nutritionRepository.createAll(viewer, [
      { name: 'Mit fleisch' },
      { name: 'Vegetarisch' },
      { name: 'Pescetarisch' },
      { name: 'Vegan' },
    ]);
  }
}

IoC.singleton('nutritionSeederCommand', ['nutritionRepository'], NutritionSeederCommand);
