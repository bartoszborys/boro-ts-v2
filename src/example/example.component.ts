import { Component } from "../../external/component/Component";
import "./example.style.scss";

@Component({
  tag: "example",
  html: require("./example.template.html"),
})
export class Example { }