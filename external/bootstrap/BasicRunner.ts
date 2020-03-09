import { Runner } from "./Runner";
import { ComponentData } from "../component/types/ComponentData";
import { ComponentDataProvider } from "../component/providers/ComponentDataProvider";
import { DefaultCustomElement } from "./custom-element/DefaultCustomElement";
import { DefaultDomIterator } from "./dom-parser/DefaultDomIterator";
import { PrefixParser } from "./dom-parser/parsers/PrefixParser";

export class BasicRunner extends Runner{
    public bootstrap(dataProviders: {new(...args: any[]): {}}[]): void {
        const provided = this.getMappedComponentData(dataProviders);
        const componentsTags = provided.map( item => item.tag);
        
        provided.forEach( (data) => {
          this.registerComponents(componentsTags, data)
        });

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

    private registerComponents(componentsTags: string[], data: ComponentData): void {
      new DefaultDomIterator({
        common: [],
        component: [],
        other: []
      }, componentsTags).iterateWith(data.dom);

      customElements.define(data.tag, class extends DefaultCustomElement {
        protected dom = data.dom;
        protected element = data.dataSource;
      });
    }
}