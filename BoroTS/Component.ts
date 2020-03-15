import "reflect-metadata";
import { ComponentParameters } from "./component-data-provider/types/ComponentParameters";
import { ComponentDataProviderBasic } from "./component-data-provider/ComponentDataProviderBasic";

export function Component(params: ComponentParameters) {
  return <T extends {new(...args: any[]): {}}>(ComponentImplementation: T): any => {
    return function(...args: any[]) {
      return new ComponentDataProviderBasic(new ComponentImplementation(...args), params);
    }
  }
}