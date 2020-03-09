import { ParsedDom } from "../dom-parser/ParsedDom"

export interface Binds {
    inputs: ParsedDom;
    outputs: ParsedDom,
    actions: ParsedDom,
    properties: ParsedDom,
}