import sut from "./does-object-match-filters";

describe("does-object-match-filters", () => {
  test("return false when given an empty object", () => {
    const object = {};
    const filters = ["Product"];
    expect(sut(object, filters)).toBe(false);
  });
  test("return true when given an empty list of filters", () => {
    const object = { name: "Product", colour: "Blue" };
    const filters = [];
    expect(sut(object, filters)).toBe(true);
  });
  test("return false when given a list of filters and an object that does not contain any field similar to any of the filters", () => {
    const object = { name: "Product", colour: "Blue" };
    const filters = ["wrong", "other"];
    expect(sut(object, filters)).toBe(false);
  });
  describe("return true when given a list of filters and an object that contains", () => {
    test("a field equal to one of the filter", () => {
      const object = { name: "Product", colour: "Blue" };
      const filters = ["Product", "other"];
      expect(sut(object, filters)).toBe(true);
    });

    test("a field that contains one of the filter", () => {
      const object = { colour: "Blue", name: "Product" };
      const filters = ["other", "ro"];
      expect(sut(object, filters)).toBe(true);
    });

    test("a field that matches one of the filter but is in a different casing", () => {
      const object = { name: "Product", colour: "Blue" };
      const filters = ["PROD"];
      expect(sut(object, filters)).toBe(true);
    });

    test("a field that matches one of the filter but is of a different type", () => {
      const object = { name: 123456, colour: "Blue" };
      const filters = ["34"];
      expect(sut(object, filters)).toBe(true);
    });
  });
});
