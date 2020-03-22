import { ComponentLogic } from "../../component-data-provider/types/component-logic";
import { AttributeExtractor } from "./atribute-extractor/attribute-extractor";

export abstract class DomElementParser {
    abstract parse(element: Node, logic: ComponentLogic): void;

    protected generateHandlerFor(logic: ComponentLogic, handlerBody: string) {
        const logicPropertyNames = Object.keys(logic);  
        return () => new Function(`{${logicPropertyNames.join(',')}}`, `return ${handlerBody}`)(logic);
    }

    protected getExtractor(prefix: string): AttributeExtractor {
        return new AttributeExtractor(prefix);
    }
}