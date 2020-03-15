import { ComponentData } from "./types/ComponentData";

export abstract class ComponentDataProvider {
    abstract get(): ComponentData;
}