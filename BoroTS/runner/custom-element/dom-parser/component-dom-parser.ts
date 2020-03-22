import { DomElementParserDecorator } from "./dom-element-parser-decorator";
import { ComponentLogic } from "../../component-data-provider/types/component-logic";

export class ComponentDomParser extends DomElementParserDecorator {
    public parse(element: Node, logic: ComponentLogic): void {
        this.decorated.parse(element, logic);
    }
}