import { DomElementParser } from "./dom-element-parser";
import { ComponentLogic } from "../../component-data-provider/types/component-logic";

export class CommonDomParser extends DomElementParser {
    public parse(element: Node, logic: ComponentLogic): void {
        console.log(element, logic);
    }
}