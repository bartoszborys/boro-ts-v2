import { Runner } from "./Runner";
import { ComponentData } from "../component/types/ComponentData";
import { ComponentDataProvider } from "../component/providers/ComponentDataProvider";

export class BasicRunner extends Runner{
    private registered: {[tag: string]: ComponentData} = {};
    
    bootstrap(dataProviders: {new(...args: any[]): {}}[]) {
        dataProviders
            .map(DataProviderConstructor => {
                const dataProvider = (new DataProviderConstructor() as any).provider;
                if( !(dataProvider instanceof ComponentDataProvider) ) {
                    throw new Error("Given dataProvider is not instance of IComponentDataProvider");
                }
                return dataProvider.get();
            })
            .forEach((provided: ComponentData) => {
                this.registered[provided.tag] = provided;
            })
    
        const children = document.body.children;
        
        [...children].forEach(element => {
            const tagName = element.tagName.toLowerCase();
            if(!(tagName in this.registered)) {
                return;
            }
            
            element.replaceWith(this.registered[tagName].dom.cloneNode(true));
        })
    }
}