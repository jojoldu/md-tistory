#!/usr/bin/env node
import 'reflect-metadata';
import { Command } from 'commander';
import { Container } from 'typedi';
import { TistoryController } from './presentation/TistoryController';
import { WinstonLogger } from './libs/logger/WinstonLogger';

const commander = new Command();

commander
  .version('0.1.0')
  .description('Markdown CLI for Tistory Blog')
  .option('-w, --write [name]', 'write tistory post from markdown file')
  .option('-u, --update [name]', 'update tistory post from markdown file')
  .parse(process.argv);

const controller = Container.get(TistoryController);
const logger = Container.get(WinstonLogger);
const options = commander.opts();

void (async () => {
  if (options.write) {
    logger.debug(`options.write=${options.write}`);
    const response = await controller.create(
      options.write === true ? null : options.write,
    );
    logger.info(
      `create success: url=${response.url}, fileFullPath=${response.fileFullPath}`,
    );
  } else {
    logger.info('Please enter the command');
  }
})();
