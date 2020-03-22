import { DomElementParserDecorator } from "./dom-element-parser-decorator";
import { ComponentLogic } from "../../component-data-provider/types/component-logic";

export class NonComponentDomParser extends DomElementParserDecorator {
    public parse(element: Node, logic: ComponentLogic): void {

        if(element instanceof HTMLElement) {
            this.bindIfNotComponent(element, logic);
        }
        this.decorated.parse(element, logic);
    }

    private bindIfNotComponent(element: HTMLElement, logic: ComponentLogic) {
        if(element.tagName.includes("-")){
            return;
        }
        this.bindInputs(element, logic);
        this.bindEvents(element, logic);
    }

    private bindInputs(element: HTMLElement, logic: ComponentLogic): void {
        const inputAttributes = this.getExtractor("#").extract([...element.attributes]);
        
        for(const attribute of inputAttributes) {
            const key = attribute.name.substr(1);
            if(!(key in element)) {
                return;
            }

            //@ts-ignore
            element[key] = this.generateHandlerFor(logic, attribute.value)();
        }
    }

    private bindEvents(element: HTMLElement, logic: ComponentLogic) {
        const outputAttributes = this.getExtractor("$").extract([...element.attributes]);
        
        for(const attribute of outputAttributes) {
            const key = attribute.name.substr(1) as keyof HTMLElement;
            const keyName = `on${key}`;
            if(!(keyName in element)) {
                return;
            }

            
            //@ts-ignore
            element[keyName] = this.generateHandlerFor(logic, attribute.value);
        }
    }
}