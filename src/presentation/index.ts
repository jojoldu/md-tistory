import { Command } from 'commander';

const commander = new Command();

commander
  .option('-n, --name <name>', 'file name')
  .option('-c, --compress', 'compress')
  .parse();
