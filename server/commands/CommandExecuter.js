import IoC from 'AppIoC';

export default class CommandExecuter {
  execute(command, ...args) {
    return command.execute(...args);
  }
}

IoC.singleton('commandExecuter', [], CommandExecuter);
