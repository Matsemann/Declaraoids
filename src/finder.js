var parser = require('./parser');

module.exports = (array) => {
    return new Proxy(array, {
        get (target, property) { return finder(target, property); }
    });
};

function finder(array, query) {
    if (!query.startsWith('find')) {
        return array[query];
    }

    var parsed = parser(query);


    var mapFunc = e => {
        var obj = {};
        parsed.find.forEach(find => {
            obj[find] = e[find];
        });
        return obj;
    };


    return () => {
        return array.map(mapFunc);
    }
}