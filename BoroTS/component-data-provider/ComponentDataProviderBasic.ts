import { ComponentDataProvider } from "./ComponentDataProvider";
import { ComponentParameters } from "./types/ComponentParameters";
import { ComponentData } from "./types/ComponentData";

export class ComponentDataProviderBasic extends ComponentDataProvider {
    constructor(private decorated: {[key: string]: string}, private params: ComponentParameters) { 
        super() 
    }

    public get(): ComponentData {
        return {
            tag: this.params.tag,
            dataSource: this.decorated,
            dom: this.generateDom(),
        }
    }

    private generateDom(): HTMLElement {
      const element = document.createElement(this.params.tag);
      element.innerHTML = this.params.html.toString();
      return element;
    }
}