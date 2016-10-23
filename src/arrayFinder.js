var finder = require('./finder');

module.exports = (array) => {
    return new Proxy(array, {
        get (target, property, args) {
            if (!property.startsWith('find')) {
                return array[property];
            }
            return args => finder[property](target, args);
        }
    });
};