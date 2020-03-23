import { ComponentLogic } from "../component-data-provider/types/component-logic";

export abstract class ObservableComponentLogic {
    abstract addObserver(handler: ()=>void): void;
    abstract removeObserver(handler: ()=>void): void;
    abstract get logic(): ComponentLogic;
}