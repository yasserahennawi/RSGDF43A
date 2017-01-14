import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import pluralize from 'pluralize';
import * as _ from 'lodash';
import inquirer from 'inquirer';
import mkdirp from 'mkdirp';
import chalk from 'chalk';

const generateFile = (templateName, data, outputPath, fileName) => {
  const source = fs.readFileSync(path.join(__dirname, 'templates', `__${templateName}.tmp`)).toString();
  const content = handlebars.compile(source)(data);

  const dir = path.join(__dirname, '../server', outputPath);

  mkdirp.sync(dir);

  const newFile = path.join(dir, `${fileName}.js`);

  if (fs.existsSync(newFile)) {
    console.log(chalk.red(`File already exists ${fileName}`));
  } else {
    console.log(chalk.green(`File written ${fileName}`));
    fs.writeFileSync(newFile, content);
  }
}

const getData = (modelName) => {
  modelName = _.lowerFirst(modelName);
  const modelsName = pluralize(modelName);
  const ModelName = _.upperFirst(modelName);

  return { modelName, modelsName, ModelName };
}

const runGenerator = (data, filesToGenerate) => {
  const files = [
    { name: 'model'          , path: `models`                    , fileName: `${data.ModelName}Model`          },
    { name: 'repository'     , path: `repositories`              , fileName: `${data.ModelName}Repository`     },
    { name: 'seederCommand'  , path: `commands/seed`             , fileName: `${data.ModelName}SeederCommand`  },
    { name: 'createCommand'  , path: `commands/${data.modelName}`, fileName: `Create${data.ModelName}Command`  },
    { name: 'updateCommand'  , path: `commands/${data.modelName}`, fileName: `Update${data.ModelName}Command`  },
    { name: 'removeCommand'  , path: `commands/${data.modelName}`, fileName: `Remove${data.ModelName}Command`  },
    // GraphQL mutations and query types
    { name: 'createMutation' , path: `graphql/mutations`         , fileName: `create${data.ModelName}Mutation` },
    { name: 'updateMutation' , path: `graphql/mutations`         , fileName: `update${data.ModelName}Mutation` },
    { name: 'removeMutation' , path: `graphql/mutations`         , fileName: `remove${data.ModelName}Mutation` },
    { name: 'graphqlType'    , path: `graphql/types`             , fileName: `${data.modelName}Type`           },
    { name: 'graphqlResolver', path: `graphql/resolvers`         , fileName: `${data.modelName}Resolver`       },
    // REST API Controller and router
    { name: 'apiController'  , path: `api/controllers`           , fileName: `${data.ModelName}Controller`     },
    { name: 'apiRouter'      , path: `api/routers`               , fileName: `${data.modelName}Router`     },
  ];

  return files
    .filter(file => filesToGenerate.indexOf(file.name) > -1)
    .forEach(file =>
      generateFile(file.name, data, file.path, file.fileName));
}


inquirer.prompt([
  {
    type: 'input',
    name: 'modelName',
    message: 'Model name you want to generate',
    validate: modelName => !!modelName
  },
  {
    type: 'checkbox',
    name: 'files',
    message: 'Files you want to generate',
    choices: [
      'model',
      'repository',
      'seederCommand',
      'createCommand',
      'updateCommand',
      'removeCommand',
      'createMutation',
      'updateMutation',
      'removeMutation',
      'graphqlType',
      'graphqlResolver',
    ],
    default: [
      'model',
      'repository',
      'seederCommand',
      'createCommand',
      'updateCommand',
      'removeCommand',
      'createMutation',
      'updateMutation',
      'removeMutation',
      'graphqlType',
      'graphqlResolver',
    ],
  },
]).then(answers => {
  runGenerator(getData(answers.modelName), answers.files);
})
