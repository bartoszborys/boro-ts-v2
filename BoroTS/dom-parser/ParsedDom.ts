export interface ParsedDom {
  [value: string]: {
    element: Element;
    name: string;
  }[]
}