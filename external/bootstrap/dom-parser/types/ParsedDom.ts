export interface ParsedDom {
  [name: string]: {
    element: Element;
    name: string;
  }[]
}