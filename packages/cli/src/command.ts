import { Command } from 'commander'
import path from 'path'
import fs from 'fs'

class WrappedCommand extends Command {
    constructor() {
        super();
    }

    findSubcommands(basePath: string) {
        const subcommandPath = path.join(basePath, 'commands');
        if (fs.existsSync(subcommandPath)) {
            fs.readdirSync(subcommandPath, { withFileTypes: true })
                // we support either nested directories or single files
                .filter((dirent) => (dirent.isDirectory() || path.extname(dirent.name) === '.ts'))
                .forEach(dirent => {
                    // we will auto-load subcommands
                    const command = require(path.join(subcommandPath, dirent.name));
                    this.addCommand(command.default);
                });
        }
    }
}

export { WrappedCommand as Command }