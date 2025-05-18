import { Command } from '@sapphire/framework';
import fetch from 'node-fetch';

export default class JokeCommand extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      name: 'joke',
      description: 'Tells you a random joke in your prefered language!',
    });
  }

  registerApplicationCommands(registry) {
    registry.registerChatInputCommand(
      (builder) =>
        builder
          .setName('joke')
          .setDescription('Tells you a random joke in your prefered language!')
          .addStringOption((option) =>
            option
              .setName('language')
              .setDescription('Language of the joke')
              .setRequired(true)
              .addChoices({ name: 'Deutsch', value: 'de' }, { name: 'Englisch', value: 'en' })
          ),
      {
        guildIds: [process.env.SERVER_GUILD_ID],
      }
    );
  }

  async chatInputRun(interaction) {
    const lang = interaction.options.getString('language');

    const url = `https://v2.jokeapi.dev/joke/Any?lang=${lang}&type=single&safe-mode`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.error || !data.joke) {
      await interaction.reply('❌ Could not load a joke.');
    } else {
      await interaction.reply(data.joke);
    }
  }
}
