import { NotComponentParser } from "../NotComponentParser/NotComponentParser";
import { ComponentParser } from "../ComponentParser/ComponentParser";
import { CommonParser } from "../CommonParser/CommonParser";

export interface ElementParsers {
    component: ComponentParser[],
    common: CommonParser[],
    other: NotComponentParser[],
}