import "reflect-metadata";
import { ComponentParameters } from "./types/ComponentParameters";
import { ComponentDataProviderBasic } from "./providers/ComponentDataProviderBasic";

export function Component(params: ComponentParameters) {
    return <T extends {new(...args: any[]): {}}>(ComponentImplementation: T): any => {
        return class {
            provider = new ComponentDataProviderBasic(new ComponentImplementation(), params);
        };
    }
}