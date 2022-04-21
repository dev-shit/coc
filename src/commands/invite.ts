import { CommandOptionType, SlashCommand, SlashCreator } from 'slash-create';

export class cocInviteCommand extends SlashCommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'cocvite',
      description: 'inviten!!',
      guildIDs: ['846468617142009917'],
      options: [{ name: 'target', description: 'persoon', type: CommandOptionType.USER }]
    });
  }

  async run(): Promise<string> {
    return 'fag';
  }
}
