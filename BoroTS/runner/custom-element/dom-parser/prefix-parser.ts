import { ReactiveAttributes } from "./reactive-attributes";
import { DomElementParser } from "./dom-element-parser";

export class PrefixParser implements DomElementParser {
    private attributes: ReactiveAttributes = {};

    constructor(private prefix: string) { }

    public get(): ReactiveAttributes {
      return this.attributes;
    }

    public parse(element: Node): void {
        this.parseAttributes(element);
    }
    
    private parseAttributes(element: Node): void {
        if(!(element instanceof Element)) {
            throw new Error("Given node is not an element");
        }

        for(const attribute of [...element.attributes]) {
            const minLength = 2;

            if(attribute.name.length < minLength) {
                continue;
            }

            const prefix = attribute.name.substring(0, 1);

            if(prefix !== this.prefix) {
                continue;
            }

            this.add(element, attribute);
        }
    }

    private add(element: Element, attribute: Attr): void {        
        if(!(this.attributes[attribute.value] instanceof Array)) {
          this.attributes[attribute.value] = [];
        }
        
        this.attributes[attribute.value].push({
          inElement: element,
          attributeName: this.getAttributeName(attribute), 
        })
    }

    private getAttributeName(attribute: Attr): string {
        return attribute.name.substring(1);
    }
}