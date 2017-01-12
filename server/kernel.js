import mongoose from 'mongoose';

/// Import all models
import configureUserModel from './models/UserModel';

/// Import all repositories
import UserRepository from './repositories/UserRepository';

/// Import all commands
import CommandExecuter from './commands/CommandExecuter';
import LoginUserCommand from './commands/user/LoginUserCommand';
import RegisterUserCommand from './commands/user/RegisterUserCommand';
import UpdateUserCommand from './commands/user/UpdateUserCommand';

// Import all seeder commands
import UserSeederCommand from './commands/seed/UserSeederCommand';

import TokenAuth from './auth/TokenAuth';
import JwtEncoderDecoder from './encoderDecoder/JwtEncoderDecoder';

import configureGraphQLSchema from './graphql/schema';

import ErrorHandler from './errors/ErrorHandler';

// Mongodb connection
const configureDatabase = () =>
  mongoose.createConnection('mongodb://127.0.0.1:27017/tastic');

// Application models
const configureModels = connection => ({
  userModel: configureUserModel(connection),
});

// Application repositories
const configureRepositories = ({ userModel }) => ({
  userRepository: new UserRepository(userModel),
})

// Object responsible for encoding and decoding tokens
const configureEncoderDecoder = secretKey =>
  new JwtEncoderDecoder(secretKey);

// Application auth manager
const configureAuthManager = ({ userRepository, encoderDecoder }) =>
  new TokenAuth(userRepository, encoderDecoder);

// Application commands
const configureCommands = ({ userRepository, authManager }) => ({
  registerUserCommand: new RegisterUserCommand(userRepository),
  updateUserCommand: new UpdateUserCommand(userRepository),
  loginUserCommand: new LoginUserCommand(authManager, userRepository),
})

// Application seeder commands
const configureSeederCommands = ({ userRepository }) => ({
  userSeederCommand: new UserSeederCommand(userRepository),
});

export default async ({ secretKey }) => {
  // Create mongoose database connection
  const connection = await configureDatabase();
  // Encoder decoder object
  const encoderDecoder = await configureEncoderDecoder(secretKey);
  // All our application db models
  const models = await configureModels(connection);
  // All our application repositories
  const repositories = await configureRepositories({
    userModel: models.userModel,
  });
  // Authentication manager
  const authManager = await configureAuthManager({
    userRepository: repositories.userRepository,
    encoderDecoder,
  });
  const commandExecuter = new CommandExecuter();
  // All our application available commands
  const commands = await configureCommands({
    userRepository: repositories.userRepository,
    authManager: authManager,
  });
  // @TODO: This should be enabled only on development...
  const seederCommands = await configureSeederCommands({
    userRepository: repositories.userRepository,
  });
  // Configure graphql schema
  const graphQLSchema = await configureGraphQLSchema({
    userRepository: repositories.userRepository,
    UserModel: models.userModel,

    authManager: authManager,

    commandExecuter: commandExecuter,
    loginUserCommand: commands.loginUserCommand,
    registerUserCommand: commands.registerUserCommand,
    updateUserCommand: commands.updateUserCommand,
  });
  // Error handler
  const errorHandler = new ErrorHandler();

  return {
    // Database layer
    models,

    // Application layer
    encoderDecoder,
    authManager,
    repositories,
    commands,
    seederCommands,

    // Interface layer
    graphql: {
      schema: graphQLSchema,
      formatError: errorHandler.format.bind(errorHandler),
    },

    // Defaults
    defaults: {
      guestViewer: await authManager.getGuest(),
    }
  };
}
