import { DomIterator } from "./dom-iterator";
import { DomElementParser } from "../dom-parser/dom-element-parser";
import { ComponentLogic } from "../../component-data-provider/types/component-logic";

export class ParsersDomIterator implements DomIterator {
    constructor(
        private domParser: DomElementParser, 
        private logic: ComponentLogic
    ) { }

    public iterate(dom: HTMLElement): void {
        const treeWalker = document.createTreeWalker(dom, NodeFilter.SHOW_ALL);
        do {
            this.domParser.parse(treeWalker.currentNode, this.logic);
        } while(treeWalker.nextNode())
    }
} 