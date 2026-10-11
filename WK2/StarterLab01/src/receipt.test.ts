import { describe, expect, test } from "@jest/globals";
import { deleteItem, subtotal, totalWithTax } from "./fixed_receipt";

describe("receipt module", () => {
  test("Happy path: Subtotal of the starting items is 47.49", () => {
    expect(subtotal()).toBeCloseTo(47.49);
  });

  test("Unhappy path: Deleting an item not on the list changes nothing", () => {
    deleteItem("pizza");
    expect(subtotal()).toBeCloseTo(47.49);
  });

  test("Edge case: A tax rate of 0 returns the subtotal", () => {
    expect(totalWithTax(0)).toBeCloseTo(47.49);
  });
});
