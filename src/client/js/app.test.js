import { handleSubmit } from "./app";

describe("Testing the submit functionality", () => {
  test("Should be defined", () => {
    expect(handleSubmit).toBeDefined();
  }),
    test("Should be a function", () => {
      expect(typeof handleSubmit).toBe("function");
    });
});
