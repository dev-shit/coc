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
              style: ButtonStyle.PRIMARY,
              label: 'button',
              custom_id: 'example_button',
              emoji: {
                name: '👌'
              }
            },
            {
              type: ComponentType.BUTTON,
              style: ButtonStyle.PRIMARY,
              label: 'boop',
              custom_id: 'fff',
              emoji: {
                name: '👌'
              }
            },
            {
              type: ComponentType.BUTTON,
              style: ButtonStyle.PRIMARY,
              label: 'tee',
              custom_id: 'aaa',
              emoji: {
                name: '👌'
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
