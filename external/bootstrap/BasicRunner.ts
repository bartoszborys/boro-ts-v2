import { Runner } from "./Runner";
import { ComponentData } from "../component/types/ComponentData";
import { ComponentDataProvider } from "../component/providers/ComponentDataProvider";

export class BasicRunner extends Runner{
    private registeredComponents: {[tag: string]: ComponentData} = {};
    
    bootstrap(dataProviders: {new(...args: any[]): {}}[]) {
        dataProviders
            .map(ProviderConstructor => {
              const providerWrapper = new ProviderConstructor()
              if( !(providerWrapper instanceof ComponentDataProvider) ) {
                  throw new Error("Given dataProvider is not instance of IComponentDataProvider");
              }
              return providerWrapper.get();
            })
            .forEach((provided: ComponentData) => {
                this.registeredComponents[provided.tag] = provided;
            })
    
        const children = document.body.children;
        
        [...children].forEach(element => {
            const tagName = element.tagName.toLowerCase();
            if(!(tagName in this.registeredComponents)) {
                return;
            }
            
            element.replaceWith(this.registeredComponents[tagName].dom.cloneNode(true));
        })
    }
}