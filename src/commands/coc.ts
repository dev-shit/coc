import {
  SlashCommand,
  CommandOptionType,
  CommandContext,
  SlashCreator,
  Message,
  ApplicationCommandPermissionType,
  ComponentType,
  ButtonStyle
} from 'slash-create';
import axios from 'axios';
import { redisClient } from '../index';

export class CocCommand extends SlashCommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'coc',
      description: 'HET IS COC TIJD!!',
      guildIDs: ['846468617142009917'],
      defaultPermission: false,
      permissions: {
        '846468617142009917': [
          {
            type: ApplicationCommandPermissionType.ROLE,
            id: '847948760319262772',
            permission: true
          }
        ]
      },
      options: [
        // {
        //   type: CommandOptionType.BOOLEAN,
        //   name: 'fastest',
        //   description: 'snelheid!'
        // },
        // {
        //   type: CommandOptionType.BOOLEAN,
        //   name: 'shortest',
        //   description: 'kortste!'
        // },
        {
          type: CommandOptionType.STRING,
          choices: [
            { name: 'ANDERSOM', value: 'REVERSE' },
            { name: 'SNELSTE', value: 'FASTEST' },
            { name: 'KORTSTE', value: 'SHORTEST' },
            { name: 'allemaal', value: 'allemaal' }
          ],
          name: 'soort',
          description: 'soort!!'
        },
        {
          type: CommandOptionType.STRING,
          choices: [
            { name: 'javascript', value: 'Javascript' },
            { name: 'ruby', value: 'Ruby' },
            { name: 'go', value: 'Go' }
          ],
          name: 'taal',
          description: 'taal!!'
        }
      ]
    });
  }

  async run(ctx: CommandContext): Promise<boolean | Message> {
    const nu = Date.now();

    const timeout = ((await redisClient.get(`${ctx.guildID}-timeout`)) as unknown) as number;

    if (nu < timeout) {
      return await ctx.send(
        `oeps, je zult ff moeten wachten (nog ${Math.round((timeout - nu) / 1000)} seconden)`
      );
    }

    const { soort, taal } = ctx.options;

    const body = [
      4364481,
      [],
      // ['Javascript', 'Ruby', 'Go']
      []
      // ['FASTEST', 'SHORTEST', 'REVERSE']
    ];

    if (soort === undefined || soort === 'allemaal') {
      body[2] = ['FASTEST', 'SHORTEST', 'REVERSE'];
    } else {
      body[2] = [soort];
    }

    if (taal === undefined) {
      body[1] = [];
    } else {
      body[1] = [taal];
    }

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
      const cocLink = `https://www.codingame.com/clashofcode/clash/${id}`;

      await redisClient.set(`${ctx.guildID}-id`, id);
      await redisClient.set(`${ctx.guildID}-timeout`, new Date().getTime() + 60 * 1000);

      await ctx.send(
        `<a:peepoalarm:845381587134840912><a:peepoalarm:845381587134840912><a:peepoalarm:845381587134840912><a:peepoalarm:845381587134840912>`,
        {
          allowedMentions: { roles: true, everyone: false },
          embeds: [
            {
              title: 'Clash Of Code tijd!',
              url: cocLink,
              description: `${body[2].toLocaleString()}\n${
                body[1] ? body[1].toLocaleString() : 'ALL'
              }`,
              footer: { text: `door ${ctx.user.username}#${ctx.user.discriminator}` }
            }
          ],
          components: [
            {
              type: ComponentType.ACTION_ROW,
              components: [
                {
                  style: ButtonStyle.LINK,
                  label: 'naar de coc',
                  type: ComponentType.BUTTON,
                  url: cocLink,
                  emoji: { animated: true, id: '845381587134840912', name: 'peepoalarm' }
                }
              ]
            }
          ]
        }
      );

      return await ctx.send('<@&847797851248394280>', {
        allowedMentions: {
          roles: true,
          everyone: false,
          users: false
        }
      });

      // return await ctx.send(`<a:peepoalarm:845381587134840912><a:peepoalarm:845381587134840912>\nHET IS COC TIJD!! https://www.codingame.com/clashofcode/clash/${id}\n${gamemode.join(
      // ' '
      // )}\n<a:peepoalarm:845381587134840912><a:peepoalarm:845381587134840912>`)
    } catch (err) {
      console.log(err, body);
      return await ctx.send(`domme hoer, je kan ook echt niks he..\n${err}}`);
    }
  }
}
