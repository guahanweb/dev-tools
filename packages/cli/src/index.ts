import { Command } from './command'

const program = new Command();

program
    .name('guahan')
    .description('developer tooling');

program.findSubcommands(__dirname);

program.parse();
