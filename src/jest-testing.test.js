import { sum, compileMotherBoxCode, fetchData, fetchDataAsPromise, fetchErrorAsPromise } from './jest-testing';
require("babel-core/register");
require("babel-polyfill");

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
    const fibonacci = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];  // ... and so on
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

// Testing Asynchronous Code & Setup and teardown - begin
// in this section, I am merging both the above mentioned sections, as I think that makes most sense

describe('async and setup / teardown', () => {
    let data;
    let errorString;
    beforeEach(() => {
        // this will be run before executing each test in this `describe` block
        data = 'peanut butter';
        errorString = 'error';
    });
    afterAll(() => {
        // this will run after all the tests have been run in this describe block
        data = errorString = null;
    });

    // technique 1 - callbacks
    test('the data is peanut butter', (done) => {
        function callback(data) {
            try {
                expect(data).toBe(data);
                done();
            } catch (error) {
                done(error);
            }
        }

        fetchData(callback);
    });

    // technique 2 - for promises
    test('the data from the promise is peanut butter', () => {
        return fetchDataAsPromise().then(data => {
            expect(data).toBe(data);
        })
    });
    test('the fetch fails with an error', () => {
        return fetchErrorAsPromise().catch(e => expect(e).toMatch(errorString));
    });

    // technique 3 - syntactic sugar for promises
    test('short - the data from the promise is peanut butter', () => {
        return expect(fetchDataAsPromise()).resolves.toBe(data);
    });
    test('short - the fetch fails with an error', () => {
        return expect(fetchErrorAsPromise()).rejects.toMatch(errorString);
    })

    // technique 4 - using async / await
    // NOTE: unlike Angular, do NOT wrap the tests in an async zone here
    // instead, just use the `async` keyword to perform the testing
    test('the data from the promise is peanut butter (async/await)', async () => {
        const data = await fetchDataAsPromise();
        expect(data).toBe(data);
    });
    test('the fetch fails with an error (async/await)', async () => {
        try {
            await fetchErrorAsPromise()
        } catch (error) {
            expect(error).toMatch(errorString);
        }
    });
    test('short - the data from the promise is peanut butter (async/await)', async () => {
        await expect(fetchDataAsPromise()).resolves.toBe(data);
    });
    test('short - the fetch fails with an error (async/await)', async () => {
        await expect(fetchErrorAsPromise()).rejects.toMatch(errorString);
    })
});
// Testing Asynchronous Code & Setup and teardown - end
