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
        if (parsed.find.length == 0) {
            return e;
        }

        var obj = {};
        parsed.find.forEach(find => {
            var properties = find.split('_');

            var current = e;
            for (var i = 0; i < properties.length; i++) {
                current = current[properties[i]];
            }

            obj[find] = current;
        });
        return obj;
    };


    return () => {
        return array.map(mapFunc);
    }
}