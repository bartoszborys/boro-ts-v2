import { DomElementParserDecorator } from "./dom-element-parser-decorator";
import { ObservableComponentLogic } from "../../observable-component-data/observable-component-logic";

export class NonComponentDomParser extends DomElementParserDecorator {
    public parse(element: Node, observableLogic: ObservableComponentLogic): void {
        debugger;
        if(element instanceof HTMLElement) {
            this.bindIfNotComponent(element, observableLogic);
        }
        this.decorated.parse(element, observableLogic);
    }

    private bindIfNotComponent(element: HTMLElement, observableLogic: ObservableComponentLogic) {
        if(element.tagName.includes("-")){
            return;
        }
        this.bindInputs(element, observableLogic);
        this.bindEvents(element, observableLogic);
    }

    private bindInputs(element: HTMLElement, observableLogic: ObservableComponentLogic): void {
        const inputAttributes = this.getExtractor("#").extract([...element.attributes]);
        
        for(const attribute of inputAttributes) {
            const key = attribute.name.substr(1);

            const valueHandler = this.generateHandlerFor(observableLogic.logic, attribute.value)
            //@ts-ignore
            const updateHandler = () => {debugger; element[key] = valueHandler();};
            observableLogic.addObserver(updateHandler);
            updateHandler();
        }
    }

    private bindEvents(element: HTMLElement, observableLogic: ObservableComponentLogic) {
        const outputAttributes = this.getExtractor("$").extract([...element.attributes]);
        
        for(const attribute of outputAttributes) {
            const key = attribute.name.substr(1) as keyof HTMLElement;
            const keyName = `on${key}`;

            //@ts-ignore
            element[keyName] = this.generateHandlerFor(observableLogic.logic, attribute.value);
        }
    }
}