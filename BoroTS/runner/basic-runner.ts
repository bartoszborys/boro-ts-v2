import { Runner } from "./runner";
import { ComponentData } from "./component-data-provider/types/component-data";
import { ComponentDataProvider } from "./component-data-provider/component-data-provider";
import { ComponentCustomElement } from "./custom-element/component-custom-element";

export class BasicRunner extends Runner{
    public bootstrap(dataProviders: {new(...args: any[]): {}}[]): void {     
        this.register(dataProviders);
        this.upgradeDom();
    }

    private register(dataProviders: {new(...args: any[]): {}}[]): void {
      dataProviders.forEach(ProviderConstructor => {
          const providerWrapper = new ProviderConstructor();

          if( !(providerWrapper instanceof ComponentDataProvider) ) {
              throw new Error("Given dataProvider is not instance of ComponentDataProvider");
          }

          this.registerComponent(providerWrapper.get());
        })
    }

    private registerComponent(data: ComponentData): void {
      customElements.define(data.tag, class extends ComponentCustomElement {
        protected html = data.html;
        protected logic = data.logic;
      });
    }
        
    private upgradeDom() {
      [...document.body.children].forEach( element => customElements.upgrade(element) );
    }
}