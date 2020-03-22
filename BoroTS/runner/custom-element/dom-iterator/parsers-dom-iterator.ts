import { DomIterator } from "./dom-iterator";
import { DomElementParser } from "../dom-parser/dom-element-parser";

export class ParsersDomIterator implements DomIterator {

    constructor(private domParsers: DomElementParser[]) { }

    public iterate(dom: HTMLElement): void {
        const treeWalker = document.createTreeWalker(dom, NodeFilter.SHOW_ALL);
        do {
            this.domParsers.forEach(parser => parser.parse(treeWalker.currentNode));
        } while(treeWalker.nextNode())
    }
} 