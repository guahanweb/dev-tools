import { Command } from '../../command'
import Telemetry from '../../lib/telemetry'

export const actionHandler = async () => {
    console.log('running backend handler...');
}

const backend = new Command()
    .name('backend')
    .description('backend subcommand for organization')
    .action(Telemetry.measure(actionHandler, 'backend'));

backend.findSubcommands(__dirname);

export default backend;
