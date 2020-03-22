import { ComponentLogic } from "../../component-data-provider/types/component-logic";
import { DomBinder } from "./dom-binder";
import { ComponentDomBinder } from "./component-dom-binder";

class MockLogic implements ComponentLogic {
    [property: string]: any;

    public mockInputPropertyFirst: any;
    public mockInputPropertySecond: any;

    public handlerCalls = 0;

    public mockEventHandler(...args: any[]) {
        this.handlerCalls++;
    }
}


const mockLogic: ComponentLogic = new MockLogic();
const mockComponentsTags: string[] = [];
const mockDom = document.createElement("mock-logic");

const binder: DomBinder = new ComponentDomBinder(mockDom, mockComponentsTags, mockLogic);

test("Should bind element property", () => {
    mockLogic.mockInputPropertyFirst = true;
    mockDom.innerHTML = `
        <span id="test" #hidden="mockInputPropertyFirst"></span>
    `;

    binder.bind();

    expect((mockDom.querySelector("#test") as HTMLElement).hidden).toBe(true);
});

test("Should bind elements property", () => {
    mockLogic.mockInputPropertyFirst = true;
    mockLogic.mockInputPropertySecond = false;
    mockDom.innerHTML = `
        <span id="testFirst" #hidden="mockInputPropertyFirst"></span>
        <span id="testSecond" #hidden="mockInputPropertySecond"></span>
    `;

    binder.bind();

    expect((mockDom.querySelector("#testFirst") as HTMLElement).hidden).toBe(true);
    expect((mockDom.querySelector("#testSecond") as HTMLElement).hidden).toBe(false);
});

test("Should bind nested elements property", () => {
    mockLogic.mockInputPropertyFirst = true;
    mockLogic.mockInputPropertySecond = false;
    mockDom.innerHTML = `
        <div>
            <span id="testFirst" #hidden="mockInputPropertyFirst"></span>
            <span id="testSecond" #hidden="mockInputPropertySecond"></span>
        </div>
    `;

    binder.bind();

    expect((mockDom.querySelector("#testFirst") as HTMLElement).hidden).toBe(true);
    expect((mockDom.querySelector("#testSecond") as HTMLElement).hidden).toBe(false);
});

test("Should bind nested and not nested elements property", () => {
    mockLogic.mockInputPropertyFirst = true;
    mockLogic.mockInputPropertySecond = false;
    mockDom.innerHTML = `
        <span id="testFirst" #hidden="mockInputPropertyFirst">
            <span id="testSecond" #hidden="mockInputPropertySecond"></span>
        </span>
    `;

    binder.bind();

    expect((mockDom.querySelector("#testFirst") as HTMLElement).hidden).toBe(true);
    expect((mockDom.querySelector("#testSecond") as HTMLElement).hidden).toBe(false);
});

test("Should bind element event", () => {
    mockLogic.handlerCalls = 0;
    mockDom.innerHTML = `
        <span id="test" @click="mockEventHandler"></span>
    `;

    binder.bind();

    mockDom.querySelector("#testFirst").dispatchEvent(new Event("click"));

    expect(mockLogic.handlerCalls).toBe(1);
});

test("Should bind elements property", () => {
    mockLogic.handlerCalls = 0;
    mockDom.innerHTML = `
        <span id="testFirst" @click="mockEventHandler"></span>
        <span id="testSecond" @click="mockEventHandler"></span>
    `;

    binder.bind();

    mockDom.querySelector("#testFirst").dispatchEvent(new Event("click"));
    mockDom.querySelector("#testSecond").dispatchEvent(new Event("click"));

    expect(mockLogic.handlerCalls).toBe(2);
});

test("Should bind nested elements property", () => {
    mockLogic.handlerCalls = 0;
    mockDom.innerHTML = `
        <div>
            <span id="testFirst" @click="mockEventHandler"></span>
            <span id="testSecond" @click="mockEventHandler"></span>
        </div>
    `;

    binder.bind();

    mockDom.querySelector("#testFirst").dispatchEvent(new Event("click"));
    mockDom.querySelector("#testSecond").dispatchEvent(new Event("click"));

    expect(mockLogic.handlerCalls).toBe(2);
});

test("Should bind nested and not nested elements property", () => {
    mockLogic.handlerCalls = 0;
    mockDom.innerHTML = `
        <span id="testFirst" @click="mockEventHandler">
            <span id="testSecond" @click="mockEventHandler"></span>
        </span>
    `;

    binder.bind();

    mockDom.querySelector("#testFirst").dispatchEvent(new Event("click"));
    mockDom.querySelector("#testSecond").dispatchEvent(new Event("click"));

    expect(mockLogic.handlerCalls).toBe(2);
});