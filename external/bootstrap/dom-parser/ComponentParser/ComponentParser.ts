import { DomElementParser } from "../DomElementParser";

export abstract class ComponentParser implements DomElementParser{
    abstract parse(element: Element): void;
}