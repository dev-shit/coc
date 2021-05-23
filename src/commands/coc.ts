import { SlashCommand, CommandOptionType, CommandContext, SlashCreator } from 'slash-create';
import axios from 'axios';

// const allowedIDs = ['125916793817530368', '262522481376493568',"246599730979799040","294217592007163905",];
// eslint-disable-next-line import/no-mutable-exports
let cocId: string;

export class CocCommand extends SlashCommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'coc',
      description: 'HET IS COC TIJD!!',
      options: [
        {
          type: CommandOptionType.BOOLEAN,
          name: 'fastest',
          description: 'snelheid!'
        },
        {
          type: CommandOptionType.BOOLEAN,
          name: 'shortest',
          description: 'kortste!'
        },
        {
          type: CommandOptionType.BOOLEAN,
          name: 'reverse',
          description: 'puzzel!'
        }
      ]
    });
  }

  async run(ctx: CommandContext): Promise<string> {
    // if (!allowedIDs.includes(ctx.user.id)) {
    //   return 'ja eh, dat wordt m niet he, pikkie';
    // }
    let { fastest, shortest, reverse } = ctx.options;

    if (fastest === undefined) fastest = true;
    if (shortest === undefined) shortest = true;
    if (reverse === undefined) reverse = true;

    const body = [
      4236940,
      {
        SHORT: true
      },
      [],
      []
      // ['FASTEST', 'SHORTEST', 'REVERSE']
    ];
    const gamemode = [];

    if (fastest === true) gamemode.push('FASTEST');
    if (shortest === true) gamemode.push('SHORTEST');
    if (reverse === true) gamemode.push('REVERSE');

    if (reverse === false && shortest === false && fastest === false) {
      gamemode.push('FASTEST');
      gamemode.push('SHORTEST');
      gamemode.push('REVERSE');
    }

    body[3] = gamemode;

    try {
      const res = await axios({
        method: 'POST',
        url: 'https://www.codingame.com/services/ClashOfCode/createPrivateClash',
        headers: {
          Cookie: process.env.COC_COOKIE,
          'Content-Type': 'application/json; charset=utf-8'
        },
        data: body
      });

      const id = res.data.publicHandle;
      cocId = id;

      return `<a:peepoalarm:845381587134840912><a:peepoalarm:845381587134840912>\nHET IS COC TIJD!! https://www.codingame.com/clashofcode/clash/${id}\n${gamemode.join(
        ' '
      )}\n<a:peepoalarm:845381587134840912><a:peepoalarm:845381587134840912>`;
    } catch (err) {
      console.log(err.response.data.message);
      return `domme hoer, je kan ook echt niks he..\n${err.message}\n${err.response.data.message}`;
    }
  }
}

export { cocId };
