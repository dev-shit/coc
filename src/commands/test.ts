import {
  ButtonStyle,
  CommandContext,
  ComponentType,
  SlashCommand,
  SlashCreator
} from 'slash-create';

export class cocLinkCommand extends SlashCommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'test',
      description: 'yeet!',
      guildIDs: ['846468617142009917']
    });
  }

  async run(ctx: CommandContext): Promise<void> {
    await ctx.defer();
    await ctx.send('here is some buttons', {
      components: [
        {
          type: ComponentType.ACTION_ROW,
          components: [
            {
              type: ComponentType.BUTTON,
              style: ButtonStyle.DESTRUCTIVE,
              label: 'knop',
              custom_id: 'a',
              emoji: {
                name: 'peepoalarm',
                animated: true,
                id: '845381587134840912'
              }
            }
          ]
        }
      ]
    });

    /**
     * This function handles component contexts within a command, so you
     * can use the previous context aswell.
     */
    ctx.registerComponent('example_button', async (btnCtx) => {
      await btnCtx.editParent('You clicked the button!');
    });
  }
}
