import { Command } from '@sapphire/framework';
import { ChatInputCommandInteraction } from 'discord.js';
import fetch from 'node-fetch';

export class JokeCommand extends Command {
  constructor(context: Command.LoaderContext, options: Command.Options) {
    super(context, {
      ...options,
      name: 'joke',
      description: 'Tells you a random joke in your preferred language!',
    });
  }

  override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      (builder) =>
        builder
          .setName('joke')
          .setDescription('Tells you a random joke in your preferred language!')
          .addStringOption((option) =>
            option
              .setName('language')
              .setDescription('Language of the joke')
              .setRequired(true)
              .addChoices({ name: 'Deutsch', value: 'de' }, { name: 'Englisch', value: 'en' })
          ),
      {
        guildIds: [process.env.SERVER_GUILD_ID!],
      }
    );
  }

  override async chatInputRun(interaction: ChatInputCommandInteraction) {
    const lang = interaction.options.getString('language');
    const url = `https://v2.jokeapi.dev/joke/Any?lang=${lang}&type=single&safe-mode`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.error || !data.joke) {
        await interaction.reply('❌ Could not load a joke.');
      } else {
        await interaction.reply(data.joke);
      }
    } catch (error) {
      await interaction.reply('❌ Error while fetching the joke.');
      console.error(error);
    }
  }
}

export default JokeCommand;
