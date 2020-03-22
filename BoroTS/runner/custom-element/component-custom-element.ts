import { CustomElement } from "./custom-element";
import { ComponentLogic } from "../component-data-provider/types/component-logic";

export class ComponentCustomElement extends CustomElement {
  protected html: string;
  protected logic: ComponentLogic;
  protected componentTags: string[];

  public connectedCallback() {
    this.innerHTML = this.html;
    
  }

  public addInputObserver(): void {
    throw new Error("Method not implemented.");
  }

  public addOutputObserver(): void {
    throw new Error("Method not implemented.");
  }

  private generateBoundActionHandler(model: Object, body: string) {
    const prototype = Object.getOwnPropertyNames(Object.getPrototypeOf(model));
    const props = Object.keys(model);
    const allKeys = prototype.concat(props);    

    return () => new Function(`{${allKeys.join(',')}}`, `return ${body}`)(model);
}
}
