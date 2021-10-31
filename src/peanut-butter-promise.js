module.exports = {
    get: () => {
        let data;
        setTimeout(() => {}, 100);
        data = 'peanut butter'
        return Promise.resolve(data);
    }
}
