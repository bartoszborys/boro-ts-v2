import { Runner } from "./Runner";
import { ComponentData } from "../component/types/ComponentData";
import { ComponentDataProvider } from "../component/providers/ComponentDataProvider";
import { DefaultCustomElement } from "./custom-element/DefaultCustomElement";

export class BasicRunner extends Runner{
    bootstrap(dataProviders: {new(...args: any[]): {}}[]) {
        const provided = this.getMappedComponentData(dataProviders);
        provided.forEach( this.registerComponents );
        [...document.body.children].forEach( element => customElements.upgrade(element) );
    }

    private getMappedComponentData(dataProviders: {new(...args: any[]): {}}[]): ComponentData[] {
      return dataProviders
        .map(ProviderConstructor => {
          const providerWrapper = new ProviderConstructor()
          if( !(providerWrapper instanceof ComponentDataProvider) ) {
              throw new Error("Given dataProvider is not instance of IComponentDataProvider");
          }
          return providerWrapper.get();
        })
    }

    private registerComponents(data: ComponentData): void {
      customElements.define(data.tag, class extends DefaultCustomElement {
        protected dom = data.dom;
        protected element = data.dataSource;
      });
    }
}