export class AttributeExtractor {
    public constructor(private prefix: string){};
    
    public extract(attributes: Attr[]): Attr[] {
        return attributes.filter(attribute => attribute.name.startsWith(this.prefix));
    }
}