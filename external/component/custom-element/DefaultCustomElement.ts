import { CustomElement } from "./CustomElement";

export class DefaultCustomElement extends CustomElement {
  protected dom: HTMLElement;
  protected model: {};

  constructor() {
    super();
  }

  public connectedCallback() {
    this.replaceWith(this.dom);
  }

  public addInputObserver(): void {
    throw new Error("Method not implemented.");
  }

  public addOutputObserver(): void {
    throw new Error("Method not implemented.");
  }
}
