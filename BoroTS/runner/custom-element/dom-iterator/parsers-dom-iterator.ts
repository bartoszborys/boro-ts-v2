import { DomIterator } from "./dom-iterator";
import { DomElementParser } from "../dom-parser/dom-element-parser";
import { ObservableComponentLogic } from "../../observable-component-data/observable-component-logic";

export class ParsersDomIterator implements DomIterator {
    constructor(
        private domParser: DomElementParser, 
        private logic: ObservableComponentLogic
    ) { }

    public iterate(dom: HTMLElement): void {
        const treeWalker = document.createTreeWalker(dom, NodeFilter.SHOW_ALL);
        do {
            this.domParser.parse(treeWalker.currentNode, this.logic);
        } while(treeWalker.nextNode())
    }
} 