import { DomParserFactoryTypes } from "./dom-parser-factory-types";
import { DomElementParser } from "../dom-parser/dom-element-parser";

export interface DomParserFactory {
    get(type: DomParserFactoryTypes): DomElementParser;
}