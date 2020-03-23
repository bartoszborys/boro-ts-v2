import { ComponentLogic } from "../../component-data-provider/types/component-logic";
import { AttributeExtractor } from "./atribute-extractor/attribute-extractor";
import { ObservableComponentLogic } from "../../observable-component-data/observable-component-logic";

export abstract class DomElementParser {
    abstract parse(element: Node, logic: ObservableComponentLogic): void;

    protected generateHandlerFor(logic: ComponentLogic, handlerBody: string): () => void {
        const logicPropertyNames = Object.keys(logic);  
        return () => new Function(`{${logicPropertyNames.join(',')}}`, `return ${handlerBody}`)(logic);
    }

    protected getExtractor(prefix: string): AttributeExtractor {
        return new AttributeExtractor(prefix);
    }
}