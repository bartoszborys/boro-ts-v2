import { ComponentDataProvider } from "./component-data-provider";
import { ComponentParameters } from "./types/component-parameters";
import { ComponentData } from "./types/component-data";
import { ComponentLogic } from "./types/component-logic";

export class ComponentDataProviderBasic extends ComponentDataProvider {
    constructor(private logic: ComponentLogic, private params: ComponentParameters) { 
        super() 
    }

    public get(): ComponentData {
        return {
            tag: this.params.tag,
            logic: this.logic,
            html: this.params.html.toString(),
        }
    }
}