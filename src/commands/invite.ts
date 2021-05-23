import { CommandOptionType, SlashCommand, SlashCreator } from 'slash-create';

import { cocId } from './coc';

export class cocInviteCommand extends SlashCommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'cocvite',
      description: 'inviten!!',
      options: [{ name: 'target', description: 'persoon', type: CommandOptionType.USER }]
    });
  }

  async run(): Promise<string> {
    // if (blacklist.includes(ctx.user.id)) {
    //   return 'donder op kut brave';
    // }
    return 'fag';
  }
}
