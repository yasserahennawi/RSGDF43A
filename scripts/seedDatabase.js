import chalk from 'chalk';
import IoC from 'AppIoC';
import configureKernel from '../server/kernel';

require('dotenv').config();
configureKernel();

const runSeeder = async () => {
  try {
    const commandExecuter = await IoC.resolve('commandExecuter');
    const flushDBCommand = await IoC.resolve('flushDBCommand');
    const genreSeederCommand = await IoC.resolve('genreSeederCommand');
    const ingredientSeederCommand = await IoC.resolve('ingredientSeederCommand');
    const invoiceSeederCommand = await IoC.resolve('invoiceSeederCommand');
    const nutritionSeederCommand = await IoC.resolve('nutritionSeederCommand');
    const orientationSeederCommand = await IoC.resolve('orientationSeederCommand');
    const productSeederCommand = await IoC.resolve('productSeederCommand');
    const recipeSeederCommand = await IoC.resolve('recipeSeederCommand');
    const userSeederCommand = await IoC.resolve('userSeederCommand');

    commandExecuter.execute(
      flushDBCommand,
      process.env.SECRET_KEY
    );
    console.log(chalk.green(`Database flushed`));

    const [ superUser ] = await commandExecuter.execute(
      userSeederCommand,
      process.env.SECRET_KEY
    );
    console.log(chalk.green(`Super user has been seeded`));

    await commandExecuter.execute(genreSeederCommand, superUser);
    console.log(chalk.green(`GenreSeederCommand has been executed`));
    await commandExecuter.execute(ingredientSeederCommand, superUser);
    console.log(chalk.green(`IngredientSeederCommand has been executed`));
    await commandExecuter.execute(invoiceSeederCommand, superUser);
    console.log(chalk.green(`InvoiceSeederCommand has been executed`));
    await commandExecuter.execute(nutritionSeederCommand, superUser);
    console.log(chalk.green(`NutritionSeederCommand has been executed`));
    await commandExecuter.execute(orientationSeederCommand, superUser);
    console.log(chalk.green(`OrientationSeederCommand has been executed`));
    await commandExecuter.execute(productSeederCommand, superUser);
    console.log(chalk.green(`ProductSeederCommand has been executed`));
    await commandExecuter.execute(recipeSeederCommand, superUser);
    console.log(chalk.green(`RecipeSeederCommand has been executed`));


  } catch(er) {
    console.log(er);
  }

  console.log(chalk.green(`DB has been seeded successfully`));
}

// Run the function directly, if it's called from the command line
if (!module.parent) runSeeder();

//
export default () => runSeeder();
