import { DefaultComponentDataProvider } from "./default-component-data-provider";
import { ComponentLogic } from "./types/component-logic";

class MockLogic implements ComponentLogic {
    mockProperty: boolean = true;
    
    public mockMethod(): void {
        this.mockProperty = false;
    }
}

const mockHtml = "<mock></mock>";
const mockTag = "mock-tag";
const mockLogic = new MockLogic();

const result = new DefaultComponentDataProvider(mockLogic, {
    html: {toString: () => mockHtml} as NodeRequire,
    tag: mockTag,
}).get();

test("Should return correct data", () => {
    expect(result.html).toBe(mockHtml);
    expect(result.tag).toBe(mockTag);
    expect(Object.keys(result.logic)).toStrictEqual(["mockProperty", "mockMethod"]);
});

test("Generated data method should mutate member", ()=> {
    expect(result.logic.mockProperty).toBe(true);
    result.logic.mockMethod();
    expect(result.logic.mockProperty).toBe(false);
})