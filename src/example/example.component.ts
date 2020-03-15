import { Component } from "../../BoroTS/Component";
import "./example.style.scss";

@Component({
  tag: "app-example",
  html: require("./example.template.html"),
})
export class Example {
  inTest: string = "Hello world2!";
}