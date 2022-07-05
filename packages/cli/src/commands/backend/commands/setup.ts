import { Command } from '../../../command'
import Telemetry from '../../../lib/telemetry'

export const actionHandler = async () => {
    console.log('running backend.setup handler...');
}

const setup = new Command()
    .name('setup')
    .description('setup subcommand for organization')
    .action(Telemetry.measure(actionHandler, 'backend.setup'));

export default setup;

