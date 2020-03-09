import { ParsedDom } from "../types/ParsedDom";
import { DomElementParser } from "../DomElementParser";

export class PrefixParser implements DomElementParser {
    private attributes: ParsedDom = {};

    constructor(private prefix: string) { }

    public get(): ParsedDom {
      return this.attributes;
    }

    public parse(element: Element): void {
        this.parseAttributes(element);
    }
    
    private parseAttributes(element: Element): void {
        for(const attribute of [...element.attributes]) {
            const minLength = 2;

            if(attribute.name.length < minLength) {
                return;
            }

            const prefix = attribute.name.substring(0, 1);

            if(prefix !== this.prefix) {
                return;
            }

            this.add(element, attribute);
        }
    }

    private add(element: Element, attribute: Attr): void {        
        if(!(this.attributes[attribute.value] instanceof Array)) {
          this.attributes[attribute.value] = [];
        }
        
        this.attributes[attribute.value].push({
          element: element,
          name: this.getAttributeName(attribute), 
        })
    }

    private getAttributeName(attribute: Attr): string {
        return attribute.name.substring(1);
    }
}