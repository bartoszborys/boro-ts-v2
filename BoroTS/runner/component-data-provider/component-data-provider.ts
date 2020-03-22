import { ComponentData } from "./types/component-data";

export abstract class ComponentDataProvider {
    abstract get(): ComponentData;
}