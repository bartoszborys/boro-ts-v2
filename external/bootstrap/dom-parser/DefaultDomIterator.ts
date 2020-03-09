import { DomIterator } from "./DomInterator";
import { ElementParsers } from "./types/ElementParsers";
import { DomElementParser } from "./DomElementParser";

export class DefaultDomIterator extends DomIterator {
    constructor(private parsers: ElementParsers, private componentsTags: string[]) {
        super();
    }

    public iterateWith(dom: HTMLElement): void {
        const treeWalker = document.createTreeWalker(dom, NodeFilter.SHOW_ELEMENT);
        do {
            this.parse(treeWalker.currentNode);
        } while(treeWalker.nextNode())

        
    }

    private parse(currentNode: Node) {
        if(!(currentNode instanceof HTMLElement)) {
            return;
        }

        if(!(currentNode.tagName.toLowerCase() in this.componentsTags)) {
            this.parseElementBy(this.parsers.other, currentNode);
        } else {
            this.parseElementBy(this.parsers.component, currentNode);
        }
        this.parseElementBy(this.parsers.common, currentNode);
    }

    private parseElementBy(parsers: DomElementParser[], element: HTMLElement): void {
        parsers.forEach( parser => parser.parse(element) );
    }
} 