import { SlashCommand, SlashCreator } from 'slash-create';
import axios from 'axios';
import { cocId } from './coc';
// const allowedIDs = ['125916793817530368', '262522481376493568',"246599730979799040","294217592007163905",];

export class StartCommand extends SlashCommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'letsgo',
      description: 'START DE COC!!'
    });
  }

  async run(): Promise<string> {
    const body = [4236940, cocId];

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
      return `domme hoer, je kan ook echt niks he..\n${err.message}\n${err.response.data.message}`;
    }
    return `<a:peepoalarm:845381587134840912><a:peepoalarm:845381587134840912>\nWE ZIJN BEGONNENNNNNNNN\n<a:peepoalarm:845381587134840912><a:peepoalarm:845381587134840912>`;
  }
}
