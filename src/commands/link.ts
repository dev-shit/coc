import { CommandContext, SlashCommand, SlashCreator } from 'slash-create';
import { redisClient } from '../index';

export class cocLinkCommand extends SlashCommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'coclink',
      description: 'linkie',
      guildIDs: ['846468617142009917']
    });
  }

  async run(ctx: CommandContext): Promise<string> {
    const cocId = await redisClient.get(`${ctx.guildID}-id`);

    if (cocId === undefined) {
      return 'doe eerst ff /coc runnen';
    }
    return `https://www.codingame.com/clashofcode/clash/${cocId}`;
  }
}
