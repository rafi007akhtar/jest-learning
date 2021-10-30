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
    setTimeout(() => {}, 3000);
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

module.exports = { sum, compileMotherBoxCode, fetchData, fetchDataAsPromise, fetchErrorAsPromise };
