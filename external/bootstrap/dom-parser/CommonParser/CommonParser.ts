import { DomElementParser } from "../DomElementParser";

export abstract class CommonParser implements DomElementParser {
    abstract parse(element: Element): void;
}