import { DomElementParser } from "./dom-element-parser";
import { ComponentLogic } from "../../component-data-provider/types/component-logic";

export abstract class DomElementParserDecorator extends DomElementParser{
    public constructor(
        protected decorated: DomElementParser
    ){ super() };

    public parse(element: Node, logic: ComponentLogic): void {
        this.decorated.parse(element, logic);
    }
}