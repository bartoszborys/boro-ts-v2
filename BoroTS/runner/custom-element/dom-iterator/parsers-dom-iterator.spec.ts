import { DomElementParser } from "../dom-parser/dom-element-parser";
import { ReactiveAttributes } from "../dom-parser/reactive-attributes";
import { ParsersDomIterator } from "../dom-iterator/parsers-dom-iterator";

class MockDomElementParser implements DomElementParser {
    public elementsCount = 0;
    
    parse(element: Node): void {
        this.elementsCount++;
    }

    get(): ReactiveAttributes {
        throw new Error("Method not implemented.");
    }
}
const mockDom = document.createElement("div");
mockDom.innerHTML = `<span>A</span><span>B</span>`;

const mockParserOne = new MockDomElementParser();
const mockParserTwo = new MockDomElementParser();

const tested = new ParsersDomIterator([
    mockParserOne,
    mockParserTwo,
]);

test("Should iterate over given DOM and put nodes in parsers", () => {
    const expectedCount = 5;

    tested.iterate(mockDom);

    expect(mockParserOne.elementsCount).toBe(expectedCount);
    expect(mockParserTwo.elementsCount).toBe(expectedCount);
});