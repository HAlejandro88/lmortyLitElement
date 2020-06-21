/* eslint-disable no-unused-expressions */
import { fixture, assert } from "@open-wc/testing";

import "../morty-element.js";

describe("Suite cases", () => {
  it("Case default", async () => {
    const _element = await fixture("<morty-element></morty-element>");
    assert.strictEqual(_element.hello, 'Hello World!');
  });
});
