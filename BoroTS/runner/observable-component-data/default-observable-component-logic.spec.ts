import { DefaultObservableComponnetLogic } from "./default-observable-component-logic";
import { ComponentLogic } from "../component-data-provider/types/component-logic";
import { ObservableComponentLogic } from "./observable-component-logic";

class MockLogic implements ComponentLogic {
    mockValue: any;
    mockMethodValue: any;
    
    mockMethod() {
        return this.mockMethodValue;
    }
}

const mockLogic = new MockLogic();
const tested: ObservableComponentLogic = new DefaultObservableComponnetLogic( mockLogic );

const mockMutableItem = {
    mutatedProperty: -1,
    secondMutatedProperty: -1,
}

const handler = () => {
    mockMutableItem.mutatedProperty = tested.logic.mockValue;
}

const secondHandler = () => {
    mockMutableItem.secondMutatedProperty = tested.logic.mockMethod();
}

test("Should update mutableItem when logic member changed", () => {
    const expectedValue = 13;

    tested.addObserver(handler);
    tested.logic.mockValue = expectedValue;
    expect(mockMutableItem.mutatedProperty).toBe(expectedValue);
    tested.removeObserver(handler);
});

test("Should update mutableItem when logic member changed", () => {
    const expectedValue = 16;
    mockLogic.mockMethodValue = "mock";
    tested.addObserver(handler);
    tested.addObserver(secondHandler);

    tested.logic.mockValue = expectedValue;
    expect(mockMutableItem.mutatedProperty).toBe(expectedValue);
    expect(mockMutableItem.secondMutatedProperty).toBe(mockLogic.mockMethodValue);

    tested.removeObserver(handler);
    tested.removeObserver(secondHandler);
});
