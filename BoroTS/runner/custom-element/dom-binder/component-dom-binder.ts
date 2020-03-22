import { DomBinder } from "./dom-binder";
import { ComponentLogic } from "../../component-data-provider/types/component-logic";

export class ComponentDomBinder implements DomBinder {
    public constructor(
        private dom: HTMLElement, 
        private componentTags: string[], 
        private logic: ComponentLogic
    ) {}
    
    public bind(): void {
        throw new Error("Method not implemented.");
    }

}