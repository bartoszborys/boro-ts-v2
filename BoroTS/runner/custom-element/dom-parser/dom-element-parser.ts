import { ReactiveAttributes } from "./reactive-attributes";

export interface DomElementParser {
    parse(element: Node): void;
    get(): ReactiveAttributes;
}