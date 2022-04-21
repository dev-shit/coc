import { SlashCreator, FastifyServer } from 'slash-create';
import path from 'path';
import { createClient } from 'redis';

// eslint-disable-next-line import/no-commonjs
require('dotenv').config();

// init redis
const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

(async (): Promise<void> => {
  await redisClient.connect();
})();

const creator = new SlashCreator({
  applicationID: process.env.DISCORD_APP_ID,
  publicKey: process.env.DISCORD_PUBLIC_KEY,
  token: process.env.DISCORD_BOT_TOKEN,
  serverPort: 8020,
  serverHost: '0.0.0.0'
});

creator.on('debug', (message) => console.log(message));
creator.on('warn', (message) => console.warn(message));
creator.on('error', (error) => console.error(error));
creator.on('synced', () => console.info('Commands synced!'));
creator.on('commandRun', (command, _, ctx) =>
  console.info(
    `${ctx.user.username}#${ctx.user.discriminator} (${ctx.user.id}) ran command ${command.commandName}`
  )
);
creator.on('commandRegister', (command) =>
  console.info(`Registered command ${command.commandName}`)
);
creator.on('commandError', (command, error) =>
  console.error(`Command ${command.commandName}:`, error)
);

creator
  .withServer(new FastifyServer())
  .registerCommandsIn(path.join(__dirname, 'commands'))
  .syncCommands()
  .startServer();

// This should serve in localhost:8020/interactions

export { redisClient };
