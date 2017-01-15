import IoC from 'AppIoC';
import ForbiddenError from '../../errors/ForbiddenError';

export default class UpdateNutritionCommand {
  constructor(nutritionRepository) {
    this.nutritionRepository = nutritionRepository;
  }

  async execute(viewer, nutritionId, {
    name,
  }) {
    return await this.nutritionRepository.update(viewer, nutritionId, {
      name
    });
  }
}

IoC.singleton('updateNutritionCommand', ['nutritionRepository'], UpdateNutritionCommand);
