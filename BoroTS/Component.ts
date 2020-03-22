import "reflect-metadata";
import { ComponentParameters } from "./runner/component-data-provider/types/component-parameters";
import { ComponentDataProviderBasic } from "./runner/component-data-provider/component-data-provider-basic";

export function Component(params: ComponentParameters) {
  return <T extends {new(...args: any[]): {}}>(ComponentImplementation: T): any => {
    return function(...args: any[]) {
      return new ComponentDataProviderBasic(new ComponentImplementation(...args), params);
    }
  }
}