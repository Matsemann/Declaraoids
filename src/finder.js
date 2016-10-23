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

    var filterFunc = args => e => {
        return parsed.where.every(where => {
            var value = e[where.property];
            var compareWith = args[where.input];
            switch (where.comparison) {
                case 'equals': return value === compareWith;
                case 'noteequals': return value !== compareWith;
                case 'lessthan': return value < compareWith;
                case 'greaterthan': return value > compareWith;
                case 'included': return value.includes(compareWith);
            }
        });
    };

    return (args) => {
        return array
            .filter(filterFunc(args))
            .map(mapFunc);
    }
}