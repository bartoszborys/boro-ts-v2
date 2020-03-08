import { DomElementParser } from "../DomElementParser";

export abstract class NotComponentParser implements DomElementParser{
    abstract parse(element: Element): void;
}