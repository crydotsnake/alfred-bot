import { Command } from '@sapphire/framework';
import 'dotenv/config';

export default class HelloWorldCommand extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      name: 'hello',
      description: 'Says hello!'
    });
  }

  registerApplicationCommands(registry) {
    registry.registerChatInputCommand(
      (builder) =>
        builder.setName('hello').setDescription('Says hello!'),
      {
        guildIds: [process.env.SERVER_GUILD_ID]
      }
    );
  }

  async chatInputRun(interaction) {
    await interaction.reply('Hello!');
  }
}
