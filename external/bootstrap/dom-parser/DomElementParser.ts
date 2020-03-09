import { ParsedDom } from "./ParsedDom";

export interface DomElementParser {
    parse(element: Element): void;
    get(): ParsedDom;
}