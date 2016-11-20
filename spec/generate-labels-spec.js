'use babel';
// @flow

import generateLabels from '../lib/generate-labels';

describe('generate labels with even number of labels', () => {
  // Use a small set of characters to simplify test cases
  const testChars = 'ABCD';
  const altLabel = ';';

  // helpers to make test cases easier to parse visually
  const s = str => str.split('');
  const gen = (num, center) => generateLabels(
    num,
    center,
    testChars,
    altLabel,
  );

  it("empty case", () => {
    expect(gen(0, 0)).toEqual([]);
  });

  it('num < string.length', () => {
    expect(gen(1, 0)).toEqual(s('A'));
    expect(gen(2, 0)).toEqual(s('AB'));
    expect(gen(3, 0)).toEqual(s('ABC'));
  });

  it("num = string length", () => {
    expect(gen(4, 0)).toEqual(s('ABCD'));
    expect(gen(4, 1)).toEqual(s('ABCD'));
    expect(gen(4, 2)).toEqual(s('ABCD'));
    expect(gen(4, 3)).toEqual(s('ABCD'));
  });

  it("num = string.length + 1", () => {
    expect(gen(5, 0)).toEqual(s('ABCD;'));
    expect(gen(5, 1)).toEqual(s('ABCD;'));
    expect(gen(5, 2)).toEqual(s('ABCD;'));
    expect(gen(5, 3)).toEqual(s('ABCD;'));
    expect(gen(5, 4)).toEqual(s(';ABCD'));
  });

  it("num = string.length + 2", () => {
    expect(gen(6, 0)).toEqual(s('ABCD;;'));
    expect(gen(6, 1)).toEqual(s('ABCD;;'));
    expect(gen(6, 2)).toEqual(s('ABCD;;'));
    expect(gen(6, 3)).toEqual(s('ABCD;;'));
    expect(gen(6, 4)).toEqual(s(';ABCD;'));
    expect(gen(6, 5)).toEqual(s(';;ABCD'));
  });

  it("num = string.length + 3", () => {
    expect(gen(7, 0)).toEqual(s('ABCD;;;'));
    expect(gen(7, 1)).toEqual(s('ABCD;;;'));
    expect(gen(7, 2)).toEqual(s('ABCD;;;'));
    expect(gen(7, 3)).toEqual(s('ABCD;;;'));
    expect(gen(7, 4)).toEqual(s(';ABCD;;'));
    expect(gen(7, 5)).toEqual(s(';;ABCD;'));
    expect(gen(7, 6)).toEqual(s(';;;ABCD'));
  });
});

describe('generate labels with odd number of labels', () => {
  // Use a small set of characters to simplify test cases
  const testChars = 'ABC';
  const altLabel = ';';

  // helpers to make test cases easier to parse visually
  const s = str => str.split('');
  const gen = (num, center) => generateLabels(
    num,
    center,
    testChars,
    altLabel,
  );

  it("empty case", () => {
    expect(gen(0, 0)).toEqual([]);
  });

  it('num < string.length', () => {
    expect(gen(1, 0)).toEqual(s('A'));
    expect(gen(2, 0)).toEqual(s('AB'));
  });

  it("num = string length", () => {
    expect(gen(3, 0)).toEqual(s('ABC'));
    expect(gen(3, 1)).toEqual(s('ABC'));
    expect(gen(3, 2)).toEqual(s('ABC'));
  });

  it("num = string.length + 1", () => {
    expect(gen(4, 0)).toEqual(s('ABC;'));
    expect(gen(4, 1)).toEqual(s('ABC;'));
    expect(gen(4, 2)).toEqual(s('ABC;'));
    expect(gen(4, 3)).toEqual(s(';ABC'));
  });

  it("num = string.length + 2", () => {
    expect(gen(5, 0)).toEqual(s('ABC;;'));
    expect(gen(5, 1)).toEqual(s('ABC;;'));
    expect(gen(5, 2)).toEqual(s('ABC;;'));
    expect(gen(5, 3)).toEqual(s(';ABC;'));
    expect(gen(5, 4)).toEqual(s(';;ABC'));
  });

  it("num = string.length + 3", () => {
    expect(gen(6, 0)).toEqual(s('ABC;;;'));
    expect(gen(6, 1)).toEqual(s('ABC;;;'));
    expect(gen(6, 2)).toEqual(s('ABC;;;'));
    expect(gen(6, 3)).toEqual(s(';ABC;;'));
    expect(gen(6, 4)).toEqual(s(';;ABC;'));
    expect(gen(6, 5)).toEqual(s(';;;ABC'));
  });
});
