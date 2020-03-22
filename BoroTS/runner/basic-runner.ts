import { Runner } from "./runner";
import { ComponentData } from "./component-data-provider/types/component-data";
import { ComponentDataProvider } from "./component-data-provider/component-data-provider";
import { ComponentCustomElement } from "./custom-element/component-custom-element";
import { ParsersDomIterator } from "./custom-element/dom-iterator/parsers-dom-iterator";

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
              throw new Error("Given dataProvider is not instance of ComponentDataProvider");
          }
          return providerWrapper.get();
        })
    }

    private registerComponents(componentsTags: string[], data: ComponentData): void {
      customElements.define(data.tag, class extends ComponentCustomElement {
        protected html = data.html;
        protected logic = data.logic;
        protected componentsTags = componentsTags;
      });
    }
}