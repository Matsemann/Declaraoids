module.exports = (array) => {
    return new Proxy(array, {
        get (target, property) { return finder(target, property); }
    });
};

function finder(array, property) {
    if (!property.startsWith('find')) {
        return array[property];
    }

    return property;
}