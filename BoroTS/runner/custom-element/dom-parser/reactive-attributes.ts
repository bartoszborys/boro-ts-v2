export interface ReactiveAttributes {
  [attributeValue: string]: {
    inElement: Element;
    attributeName: string;
  }[]
}