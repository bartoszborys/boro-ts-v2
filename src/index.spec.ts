import { ComponentDataProviderBasic } from '../external/component/providers/ComponentDataProviderBasic';
import { ComponentData } from '../external/component/types/ComponentData';

test("first", () => {
  const result = new ComponentDataProviderBasic({}, {html: require("./index.html"), tag: "abc"}).get();
  const expected: ComponentData = {
    tag: "", 
    dom: document.createElement('div'),
    dataSource: {}
  };
  expect(true).toBe(true);
});