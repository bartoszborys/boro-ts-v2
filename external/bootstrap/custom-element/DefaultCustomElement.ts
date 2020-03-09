import { CustomElement } from "./CustomElement";
import { Binds } from "./Binds";

export class DefaultCustomElement extends CustomElement {
  protected binds: Binds;
  protected dom: HTMLElement;
  protected model: {};

  constructor() {
    super();
  }

  public connectedCallback() {
    Object.entries(this.binds.properties).forEach(([action, elementDetails]) => {
      const handler = this.generateBoundActionHandler(this.model, action);
      elementDetails.forEach( item => {
        (item.element as any)[item.name] = handler();
      })
    });

    [...this.dom.children].forEach( child => this.appendChild(child));
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
