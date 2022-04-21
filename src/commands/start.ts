import {
  SlashCommand,
  SlashCreator,
  CommandContext,
  ApplicationCommandPermissionType,
  ComponentType,
  ButtonStyle
} from 'slash-create';
import axios from 'axios';
import { redisClient } from 'src';

async function submitCode(id: string): Promise<void> {
  const body = [
    id,
    {
      code: '# autosubmit\nputs 0',
      programmingLanguageId: 'Ruby'
    },
    null
  ];

  await axios({
    method: 'POST',
    url: 'https://www.codingame.com/services/TestSession/submit',
    headers: {
      Cookie: process.env.COC_COOKIE,
      'Content-Type': 'application/json; charset=utf-8'
    },
    data: body
  });
}

export class StartCommand extends SlashCommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'letsgo',
      guildIDs: ['846468617142009917'],
      description: 'START DE COC!!',
      defaultPermission: false,
      permissions: {
        '846468617142009917': [
          {
            type: ApplicationCommandPermissionType.ROLE,
            id: '847948760319262772',
            permission: true
          }
        ]
      }
    });
  }

  async run(ctx: CommandContext): Promise<void> {
    const cocId = await redisClient.get(`${ctx.guildID}-id`);
    const body = [4364481, cocId];

    try {
      await axios({
        method: 'POST',
        url: 'https://www.codingame.com/services/ClashOfCode/startClashByHandle',
        headers: {
          Cookie: process.env.COC_COOKIE,
          'Content-Type': 'application/json; charset=utf-8'
        },
        data: body
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err) {
      console.log(err.response.data.message);
      await ctx.send(
        `domme hoer, je kan ook echt niks he..\n${err.message}\n${err.response.data.message}`
      );
      return;
    }

    await ctx.send(
      `<a:peepoalarm:845381587134840912><a:peepoalarm:845381587134840912>\nWE ZIJN BEGONNENNNNNNNN\n<a:peepoalarm:845381587134840912><a:peepoalarm:845381587134840912>`,
      {
        components: [
          {
            type: ComponentType.ACTION_ROW,
            components: [
              {
                style: ButtonStyle.LINK,
                label: 'naar de coc',
                type: ComponentType.BUTTON,
                url: `https://www.codingame.com/clashofcode/clash/${cocId}`,
                emoji: { animated: true, id: '845381587134840912', name: 'peepoalarm' }
              }
            ]
          }
        ]
      }
    );
    // setTimeout(() => {
    // submitCode(cocId);
    // }, 15000);
  }
}
