export abstract class Runner {
    abstract bootstrap(dataProviders: {new(...args: any[]): {}}[]): void;
}