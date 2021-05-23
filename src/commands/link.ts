import { SlashCommand, SlashCreator } from 'slash-create';

import { cocId } from './coc';

export class cocLinkCommand extends SlashCommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'coclink',
      description: 'linkie'
    });
  }

  async run(): Promise<string> {
    // if (blacklist.includes(ctx.user.id)) {
    //   return 'donder op kut brave';
    // }

    if (cocId === undefined) {
      return 'doe eerst ff /coc runnen';
    }
    return `https://www.codingame.com/clashofcode/clash/${cocId}`;
  }
}
