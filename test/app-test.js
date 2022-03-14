// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Command } = require('commander');

const program = new Command();

program
  .option('-f, --file <name>', 'Markdown File name', 'README.md')
  .option('-c, --create', 'create', false)
  .option('-u, --update', 'update', false)
  .option('-i, --init', 'init', false)
  .option('-n, --name <name>', 'blog name', false)
  .parse();

// eslint-disable-next-line no-console
console.log(JSON.stringify(program.opts()));
