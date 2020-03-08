import { DomIterator } from "./DomInterator";
import { ElementParsers } from "./types/ElementParsers";

export class DefaultDomIterator extends DomIterator {
    constructor(private parsers: ElementParsers) {
        super();
    }

    public iterateWith(dom: HTMLElement): void {
        
    }

} 