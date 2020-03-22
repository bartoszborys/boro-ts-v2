import { ComponentLogic } from "../../component-data-provider/types/component-logic";

export abstract class DomElementParser {
    abstract parse(element: Node, logic: ComponentLogic): void;
}