import { ObservableComponentLogic } from "./observable-component-logic";
import { ComponentLogic } from "../component-data-provider/types/component-logic";

export class DefaultObservableComponnetLogic extends ObservableComponentLogic {
    private handlers: (()=>void)[] = [];
    private proxedLogic: ComponentLogic;

    public constructor(logic: ComponentLogic) {
        super();
        this.proxedLogic = this.getProxedLogic(logic);
    }

    private getProxedLogic(logic: ComponentLogic): ComponentLogic {
        return new Proxy(logic, {
            set: (object: ComponentLogic, prop: string, value: any) => {
                object[prop] = value;
                this.handlers.forEach( handler => handler() );
                return true;
            }
        });
    }

    public addObserver(handler: ()=>void): void {
        this.handlers.push(handler);
    };
    
    public removeObserver(handler: () => void): void {
        const index = this.handlers.findIndex(handler);
        this.handlers.splice(index, 1);
    }

    get logic(): ComponentLogic {
        return this.proxedLogic;
    }
}