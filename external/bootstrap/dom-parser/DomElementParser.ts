import { ParsedDom } from "./types/ParsedDom";

export interface DomElementParser {
    parse(element: Element): void;
    get(): ParsedDom;
}