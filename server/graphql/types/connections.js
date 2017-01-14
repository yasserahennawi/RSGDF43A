import {
  connectionDefinitions
} from 'graphql-relay';

import IoC from 'AppIoC';

const genresConnectionType = genreType => connectionDefinitions({
  nodeType: genreType
}).connectionType;

const ingredientsConnectionType = ingredientType => connectionDefinitions({
  nodeType: ingredientType
}).connectionType;

const invoicesConnectionType = invoiceType => connectionDefinitions({
  nodeType: invoiceType
}).connectionType;

const nutritionsConnectionType = nutritionType => connectionDefinitions({
  nodeType: nutritionType
}).connectionType;

const orientationsConnectionType = orientationType => connectionDefinitions({
  nodeType: orientationType
}).connectionType;

const recipesConnectionType = recipeType => connectionDefinitions({
  nodeType: recipeType
}).connectionType;

const productsConnectionType = productType => connectionDefinitions({
  nodeType: productType
}).connectionType;

const usersConnectionType = userType => connectionDefinitions({
  nodeType: userType
}).connectionType;

IoC.callableMany([
  ['genresConnectionType', ['genreType'], genresConnectionType],
  ['ingredientsConnectionType', ['ingredientType'], ingredientsConnectionType],
  ['invoicesConnectionType', ['invoiceType'], invoicesConnectionType],
  ['nutritionsConnectionType', ['nutritionType'], nutritionsConnectionType],
  ['orientationsConnectionType', ['orientationType'], orientationsConnectionType],
  ['recipesConnectionType', ['recipeType'], recipesConnectionType],
  ['productsConnectionType', ['productType'], productsConnectionType],
  ['usersConnectionType', ['userType'], usersConnectionType],
]);
