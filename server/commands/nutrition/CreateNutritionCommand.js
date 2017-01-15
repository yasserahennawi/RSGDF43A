import IoC from 'AppIoC';
import ForbiddenError from '../../errors/ForbiddenError';

export default class CreateNutritionCommand {
  constructor(nutritionRepository) {
    this.nutritionRepository = nutritionRepository;
  }

  async execute(viewer, {
    name,
  }) {
    return await this.nutritionRepository.create(viewer, {
      name
    });
  }
}

IoC.singleton('createNutritionCommand', ['nutritionRepository'], CreateNutritionCommand);
