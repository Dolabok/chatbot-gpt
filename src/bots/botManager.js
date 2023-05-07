import { getAvatarByName } from '../components/contacts';

// Handles a single bot command
function handleSingleBotCommand(bot, action, args) {
  if (bot) {
    bot.handleAction(action, args);
  } else {
    console.warn('Bot not found.');
  }
}

// Handles bot commands for multiple bots
function handleMultipleBotCommands(bots, action, args) {
  bots.forEach((bot) => {
    bot.handleAction(action, args);
  });
}

// Main function to handle bot commands
export function handleBotCommand(command, contacts, bots) {
  const [botName, action, ...args] = command.split(' ');

  if (botName === '@bots') {
    handleMultipleBotCommands(bots, action, args);
  } else {
    const bot = bots.find((b) => `@${b.name}` === botName);
    handleSingleBotCommand(bot, action, args);
  }
}
