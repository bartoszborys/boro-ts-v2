import { Component } from "../../BoroTS/Component";
import "./hello.style.scss";

@Component({
  tag: "app-hello",
  html: require("./hello.template.html"),
})
export class Hello {
  inTest: string = "Hello world!";
  color: boolean = true;

  toggle() {
    this.color = !this.color;
  }
}