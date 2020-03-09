import { DomElementParser } from "../DomElementParser";

export interface ElementParsers {
    component: DomElementParser[],
    common: DomElementParser[],
    other: DomElementParser[],
}