import { CommonDomParser } from "../dom-parser/common-dom-parser";
import { DomElementParser } from "../dom-parser/dom-element-parser";
import { ComponentDomParser } from "../dom-parser/component-dom-parser";
import { NonComponentDomParser } from "../dom-parser/non-component-dom-parser";
import { DomParserFactory } from "./dom-parser-factory";
import { DomParserFactoryTypes } from "./dom-parser-factory-types";


export class ParsersFactory implements DomParserFactory {
    public get(type: DomParserFactoryTypes): DomElementParser {
        switch(type) {
            case DomParserFactoryTypes.DEFAULT:
                return this.defaultParser;
            default:
                throw new Error("Unknown type");
        }
    }

    private get defaultParser(): DomElementParser { 
        return new NonComponentDomParser(
                new ComponentDomParser(
                 new CommonDomParser()
                )
            );
    }

}