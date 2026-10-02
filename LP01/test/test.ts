import { test, expect } from "@jest/globals";
import {
  isEven,
  add,
  divide,
  palindrome,
  countVowels,
  findMax,
  removeDuplicates,
} from "../src/functions";

test("isEven num even", () => {
  expect(isEven(10)).toBe(true);
});

test("isEven num odd", () => {
  expect(isEven(9)).toBe(false);
});

test("palindrome is palindrome", () => {
  expect(palindrome("ufotofu")).toBe(true);
});

test("palindrome is not palindrome", () => {
  expect(palindrome("tofu")).toBe(false);
});

test("countVowels has vowels",() => {
  expect(countVowels("Testing")).toBe(2);
});

test("countVowels has no vowels", () => {
  expect(countVowels("tsk")).toBe(0);
});

// broken test
test("countVowels has no vowels", () => {
  expect(countVowels("task")).toBe(0);
});