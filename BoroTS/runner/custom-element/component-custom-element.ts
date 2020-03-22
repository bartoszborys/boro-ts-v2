import { CustomElement } from "./custom-element";
import { ComponentLogic } from "../component-data-provider/types/component-logic";
import { ParsersFactory } from "./dom-parser-factory/parsers-factory";
import { DomParserFactoryTypes } from "./dom-parser-factory/dom-parser-factory-types";
import { ParsersDomIterator } from "./dom-iterator/parsers-dom-iterator";

export class ComponentCustomElement extends CustomElement {
  protected html: string;
  protected logic: ComponentLogic;

  public connectedCallback() {
    this.innerHTML = this.html;
    const domParser = (new ParsersFactory()).get(DomParserFactoryTypes.DEFAULT);
    (new ParsersDomIterator(domParser, this.logic)).iterate(this);
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
