import { DomElementParser } from "../dom-parser/dom-element-parser";
import { ParsersDomIterator } from "../dom-iterator/parsers-dom-iterator";
import { ComponentLogic } from "../../component-data-provider/types/component-logic";

class MockDomElementParser implements DomElementParser {
    public elementsCount = 0;
    
    parse(element: Node, logic: ComponentLogic): void {
        this.elementsCount++;
    }
}
const mockDom = document.createElement("div");
mockDom.innerHTML = `<span>A</span><span>B</span>`;

const mockParserOne = new MockDomElementParser();

const tested = new ParsersDomIterator(mockParserOne, {});

test("Should iterate over given DOM and put nodes in parsers", () => {
    const expectedCount = 5;

    tested.iterate(mockDom);

    expect(mockParserOne.elementsCount).toBe(expectedCount);
});