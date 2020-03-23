import { DomElementParser } from "./dom-element-parser";
import { ObservableComponentLogic } from "../../observable-component-data/observable-component-logic";

export abstract class DomElementParserDecorator extends DomElementParser{
    public constructor(
        protected decorated: DomElementParser
    ){ super() };

    public parse(element: Node, logic: ObservableComponentLogic): void {
        this.decorated.parse(element, logic);
    }
}