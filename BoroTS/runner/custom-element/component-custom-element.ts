import { CustomElement } from "./custom-element";
import { ParsersFactory } from "./dom-parser-factory/parsers-factory";
import { DomParserFactoryTypes } from "./dom-parser-factory/dom-parser-factory-types";
import { ParsersDomIterator } from "./dom-iterator/parsers-dom-iterator";
import { DefaultObservableComponnetLogic } from "../observable-component-data/default-observable-component-logic";
import { ComponentLogic } from "../component-data-provider/types/component-logic";

export class ComponentCustomElement extends CustomElement {
  protected html: string;
  protected logic: ComponentLogic;

  public connectedCallback() {
    this.innerHTML = this.html;
    const domParser = (new ParsersFactory()).get(DomParserFactoryTypes.DEFAULT);
    (new ParsersDomIterator(domParser, this.protoWithMethodsInProperties)).iterate(this);
  }

  private get protoWithMethodsInProperties(): DefaultObservableComponnetLogic {
    if(!this.logic.constructor) {
      throw new Error("Given logic doesn't has constructor");
    }
    const observableLogic = new DefaultObservableComponnetLogic(new (this.logic.constructor as {new(...args: any[]): {}}));
    const logicMethodsNames = Object.getOwnPropertyNames(Object.getPrototypeOf(observableLogic.logic)).filter( item => item != 'constructor');
    logicMethodsNames.forEach(methodName => observableLogic.logic[methodName] = observableLogic.logic[methodName].bind(observableLogic.logic));
    return observableLogic;
  }

  public addInputObserver(): void {
    throw new Error("Method not implemented.");
  }

  public addOutputObserver(): void {
    throw new Error("Method not implemented.");
  }
}
