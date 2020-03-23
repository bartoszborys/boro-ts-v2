import "reflect-metadata";
import { ComponentParameters } from "./runner/component-data-provider/types/component-parameters";
import { DefaultComponentDataProvider } from "./runner/component-data-provider/default-component-data-provider";

export function Component(params: ComponentParameters) {
  return <T extends {new(...args: any[]): {}}>(ComponentImplementation: T): any => {
    return function(...args: any[]) {
      return new DefaultComponentDataProvider(new ComponentImplementation(...args), params);
    }
  }
}