import { DomIterator } from "./DomInterator";
import { DomElementParser } from "../dom-parser/DomElementParser";
import { PrefixParser } from "../dom-parser/PrefixParser";
import { Binds } from "../custom-element/Binds";

export class DefaultDomIterator extends DomIterator {
    private inputParser = new PrefixParser('#');
    private outputParser = new PrefixParser('$');
    private actionParser = new PrefixParser('$');
    private propertyParser = new PrefixParser('#');

    constructor(private componentsTags: string[]) {
        super();
    }

    public iterate(dom: HTMLElement): Binds {
        const treeWalker = document.createTreeWalker(dom, NodeFilter.SHOW_ALL);
        do {
            this.parse(treeWalker.currentNode);
        } while(treeWalker.nextNode())

        return {
            inputs: this.inputParser.get(),
            outputs: this.outputParser.get(),
            actions: this.actionParser.get(),
            properties: this.propertyParser.get(),
        }
    }

    private parse(currentNode: Node) {
        if(!(currentNode instanceof HTMLElement)) {
            console.log(currentNode);
            return;
        }

        if(!(currentNode.tagName.toLowerCase() in this.componentsTags)) {
            this.actionParser.parse(currentNode);
            this.propertyParser.parse(currentNode);
        } else {
            this.inputParser.parse(currentNode);
            this.outputParser.parse(currentNode);
        }
    }
} 