export default class CommandExecuter {
  execute(command, ...args) {
    return command.execute(...args);
  }
}
