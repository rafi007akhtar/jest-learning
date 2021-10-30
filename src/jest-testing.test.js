import { sum, compileMotherBoxCode } from './jest-testing';

// Getting Started - begin
test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});
// Getting started - end

// Using Matchers - begin
test('object comparison', () => {
    const obj1 = { one: 1, two: 2 };
    const obj2 = { two: 2, one: 1 };
    expect(obj1).toEqual(obj2);
});
test('to be or not to be: that is the question', () => {
    const toBeOr = 'to be or';
    const thatIsTheQuestion = 'that is the question';
    expect(toBeOr).not.toBe(thatIsTheQuestion);
});
test('add floating point numbers', () => {
    const pi = 3.1416;
    const g = 9.8;
    const pig = 12.9416;
    expect(pi + g).toBeCloseTo(pig);  // use `toBeCloseTo`, instead of `toBe` or `toEqual` for floating numbers
});
test('there is no I in team', () => {
    expect('team').not.toMatch(/i/);
    // ... but there is one in Tim
    expect('Tim').toMatch(/i/);
    // so, use `toMatch` for testing strings
});
test('array inclusivity', () => {
    const fibonacci = [ 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 ];  // ... and so on
    expect(fibonacci).toContain(13);
    expect(new Set(fibonacci)).toContain(1);
    expect(fibonacci).not.toContain(4);
    // so, use the `toContain` matcher to test array inclusivity
});
test('summon the Darkseid', () => {
    expect(() => compileMotherBoxCode()).toThrow(Error);  // alternative: you can put the expected error message in string inside `toThrow`
    // so, use `toThrow` to test exceptions handling
});
// Using Matchers - end
