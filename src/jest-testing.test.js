import { sum, compileMotherBoxCode, fetchData, fetchDataAsPromise, fetchErrorAsPromise, emitData, customForEach } from './jest-testing';
import defaultExport, { foo, bar } from './partial';
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

// Mock functions - begin
// use the `jest.fn` method to create a mock function
const mockCallback = jest.fn(x => x + 42);

test('the .mock property of the mock callback method', () => {
    customForEach([1, 2, 3], mockCallback);

    // the mock function should have been called 3 times exactly
    expect(mockCallback.mock.calls.length).toBe(3);
    // The first argument of the first call to the function was 1
    expect(mockCallback.mock.calls[0][0]).toBe(1);
    // The first argument of the second call to the function was 2
    expect(mockCallback.mock.calls[1][0]).toBe(2);
    // The return value of the first call to the function was 43
    expect(mockCallback.mock.results[0].value).toBe(43);

    // Now, using Custom Matchers
    expect(mockCallback).toHaveBeenCalledTimes(3);
    expect(mockCallback).toHaveBeenCalledWith(1);
    expect(mockCallback).toHaveBeenCalledWith(2);
    expect(mockCallback).toHaveNthReturnedWith(1, 43);
});

describe('Testing Mock Functions', () => {
    let emptyMockFn = jest.fn();
    beforeEach(() => {
        emptyMockFn = jest.fn();
    })

    test('instantiation of the .mock property', () => {
        new emptyMockFn();
        new emptyMockFn();
        console.log(emptyMockFn.mock.instances);
        expect(emptyMockFn.mock.instances.length).toBe(2);
    });

    test('mock return values', () => {
        // the following ways can be used to program mock functions to return specified values
        emptyMockFn
            .mockReturnValueOnce(10)
            .mockReturnValueOnce('x')
            .mockReturnValue(true)
            .mockReturnValue(true);

        const [first, second, third, fourth] = [emptyMockFn(), emptyMockFn(), emptyMockFn(), emptyMockFn()];
        expect(first).toBe(10);
        expect(second).toEqual('x');
        expect(third).toBe(true);
        expect(fourth).toBe(true);
    });
});

describe('mock modules', () => {
    jest.mock('./peanut-butter-promise');
    const peanutButter = require('./peanut-butter-promise');
    test('mocking modules', () => {
        peanutButter.get.mockResolvedValue('Plot twise! This is not peanut butter. *Evil laughs*');
        peanutButter.get().then(data => expect(data).toMatch('*Evil laughs*'));
    });
});

jest.mock('./partial', () => {
    const originalModule = jest.requireActual('./partial');

    // Mocking the default export, and the named export 'bar'
    return {
        __esModule: true,
        ...originalModule,
        default: jest.fn(() => 'mocked baz'),
        foo: 'mocked foo'
    }
});
test('mocking partials', () => {
    const defaultExportResult = defaultExport();
    expect(defaultExportResult).toBe('mocked baz')
    expect(defaultExport).toHaveBeenCalled();
    expect(foo).toBe('mocked foo');
    expect(bar()).toBe('bar');
});

describe('mock implementation', () => {
    jest.mock('./peanut-butter-module');
    const peanutButter = require('./peanut-butter-module');
    peanutButter.mockImplementation(() => 'NOT peanut butter');

    test('mocking implementation', () => {
        expect(peanutButter()).toBe('NOT peanut butter');
    });
});

// Skipping Mock Names, because I don't think I will be needing it anytime soon.
// URL for reference: https://jestjs.io/docs/mock-functions#mock-names

// Mock functions - end

// extras - begin
test('emitted data is peanut butter', async () => {
    const data = await emitData();
    expect(data).toBe('peanut butter');
});
// extras - end
