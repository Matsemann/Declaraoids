var declaraoids = require('./declaraoids');

module.exports = (array) => {
    return new Proxy(array, {
        get (target, property) {
            if (!property.startsWith('find')) {
                return array[property];
            }
            return args => declaraoids[property](target, args);
        }
    });
};