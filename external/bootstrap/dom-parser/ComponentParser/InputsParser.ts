import { ComponentParser } from "./ComponentParser";

export class InputParser extends ComponentParser {
    private prefix = "#";
    private inputs: {}[] = [];

    public parse(element: Element): void {
        [...element.children].forEach(element => this.parseAttributes(element) );
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

    private add(element: Element, attribute: Attr): any {
        this.inputs.push({
            element: element,
            name: this.getAttributeName(attribute),
            value: attribute.value,
        });
    }

    private getAttributeName(attribute: Attr): string {
        return attribute.name.substring(1);
    }
}