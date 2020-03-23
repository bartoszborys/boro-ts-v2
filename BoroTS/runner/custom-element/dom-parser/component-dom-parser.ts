import { DomElementParserDecorator } from "./dom-element-parser-decorator";
import { ObservableComponentLogic } from "../../observable-component-data/observable-component-logic";

export class ComponentDomParser extends DomElementParserDecorator {
    public parse(element: Node, logic: ObservableComponentLogic): void {
        this.decorated.parse(element, logic);
    }
}