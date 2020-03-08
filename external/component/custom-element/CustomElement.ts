export abstract class CustomElement extends HTMLElement {
  abstract addInputObserver(): void;
  abstract addOutputObserver(): void;
}
