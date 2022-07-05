type ActionProxy = (...args: any) => any;

interface TelemetryOptions {
    application: string
}

const defaultTelemetryOptions: any = {}

class Telemetry {
    config: TelemetryOptions;

    constructor(opts: TelemetryOptions) {
        this.config = {
            ...defaultTelemetryOptions,
            ...opts,
        };
    }

    success(action: string, duration: number) {
        console.log('[telemetry:success]', this.config.application, action, duration, 'ms');
    }

    error(action: string, duration: number) {
        console.warn('[telemetry:error]', this.config.application, action, duration, 'ms');
    }

    measure(proxy: ActionProxy, action: string): ActionProxy {
        const telemetry = this;
        return async function (...args: any[]) {
            const start = new Date().getTime();
            const promise = proxy.apply({}, args);

            // time the success case
            promise.then(() => {
                const duration = (new Date().getTime()) - start;
                telemetry.success(action, duration);
            });

            // time the error case
            promise.catch((err: any) => {
                const duration = (new Date().getTime()) - start;
                telemetry.error(action, duration);
            });

            // return the promise for additional chaining
            return promise;
        }
    }
}

const instance = new Telemetry({ application: 'cli' });
export default instance;
