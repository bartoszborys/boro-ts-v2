import { Component } from "../../BoroTS/Component";
import "./hello.style.scss";

@Component({
  tag: "app-hello",
  html: require("./hello.template.html"),
})
export class Hello {
  inTest: string = "Hello world!";
  visibility: boolean = true;

  toggle() {
    console.log("before");
    console.log(this.visibility);
    this.visibility = !this.visibility;
    console.log("after");
    console.log(this.visibility);
  }
}