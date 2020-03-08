import "reflect-metadata";
import { ComponentParameters } from "./types/ComponentParameters";
import { ComponentDataProviderBasic } from "./providers/ComponentDataProviderBasic";

export function Component(params: ComponentParameters) {
  return <T extends {new(...args: any[]): {}}>(ComponentImplementation: T): any => {
    return function(...args: any[]) {
      return new ComponentDataProviderBasic(new ComponentImplementation(...args), params);
    }
  }
}