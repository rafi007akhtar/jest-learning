function sum(a, b) {
    return a + b;
}

function compileMotherBoxCode() {
    throw new Error('bruh this tech ain\'t Apocalyptic');
}

/**
 * This method will imitate API data emission behaviour, by returning some mock data after an (artificial) delay.
 */
function emitData() {
    const data = 'peanut butter';
    setTimeout(() => {}, 100);
    return data;
}

function fetchData(cb) {
    const data = emitData();
    cb(data);
}

function fetchDataAsPromise() {
    const data = emitData();
    return Promise.resolve(data);
}

function fetchErrorAsPromise() {
    const data = emitData();
    return Promise.reject('error');
}

/**
 * A simple implementation of the `forEach` array method in JavaScript.
 * @param {Array} array - the array on which the iterations need to be performed
 * @param {Function} cb - the callback function which needs to be called with every element of the array
 */
function customForEach(array, cb) {
    for (let i = 0; i < array.length; i++) {
        cb(array[i]);
    }
}

module.exports = { sum, compileMotherBoxCode, fetchData, fetchDataAsPromise, fetchErrorAsPromise, emitData, customForEach };
