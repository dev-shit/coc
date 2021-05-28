import {
  SlashCommand,
  CommandOptionType,
  CommandContext,
  SlashCreator,
  Message,
  ApplicationCommandPermissionType
} from 'slash-create';
import axios from 'axios';

// const allowedIDs = ['125916793817530368', '262522481376493568',"246599730979799040","294217592007163905",];
export const blacklist = ['326072736717733909'];
// eslint-disable-next-line import/no-mutable-exports
let cocId: string;
// eslint-disable-next-line import/no-mutable-exports
let timeout: number;

export class CocCommand extends SlashCommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'coc',
      description: 'HET IS COC TIJD!!',
      defaultPermission: false,
      permissions: {
        '846468617142009917': [
          {
            type: ApplicationCommandPermissionType.ROLE,
            id: '847740634697695233',
            permission: true
          }
        ]
      },
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

  async run(ctx: CommandContext): Promise<boolean | Message> {
    const nu = Date.now();

    if (nu < timeout) {
      return await ctx.send(
        `oeps, je zult ff moeten wachten (nog ${Math.round((timeout - nu) / 1000)} seconden)`
      );
    }

    let { fastest, shortest, reverse } = ctx.options;

    if (fastest === undefined) fastest = true;
    if (shortest === undefined) shortest = true;
    if (reverse === undefined) reverse = true;

    const body = [
      4364481,
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
      timeout = new Date().getTime() + 60 * 1000;
      return await ctx.send(
        `<a:peepoalarm:845381587134840912><a:peepoalarm:845381587134840912><a:peepoalarm:845381587134840912><a:peepoalarm:845381587134840912>`,
        {
          allowedMentions: { roles: true, everyone: false },
          embeds: [
            {
              title: 'Clash Of Code tijd!',
              url: `https://www.codingame.com/clashofcode/clash/${id}`,
              description: gamemode.join(' ').toLowerCase(),
              footer: { text: `door ${ctx.user.username}#${ctx.user.discriminator}` }
            }
          ]
        }
      );
      // return await ctx.send(`<a:peepoalarm:845381587134840912><a:peepoalarm:845381587134840912>\nHET IS COC TIJD!! https://www.codingame.com/clashofcode/clash/${id}\n${gamemode.join(
      // ' '
      // )}\n<a:peepoalarm:845381587134840912><a:peepoalarm:845381587134840912>`)
    } catch (err) {
      console.log(err.response.data.message);
      return await ctx.send(
        `domme hoer, je kan ook echt niks he..\n${err.message}\n${err.response.data.message}`
      );
    }
  }
}

export { cocId, timeout };
