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

        if (parsed.find.length == 1) {
            return findNested(e, parsed.find[0].prop);
        }

        var obj = {};
        parsed.find.forEach(find => {
            obj[find.name] = findNested(e, find.prop);
        });
        return obj;
    };

    var filterFunc = args => e => {
        return parsed.where.every(where => {
            var value = findNested(e, where.property);
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

function findNested(start, path) {
    var properties = path.split('_');

    var current = start;
    for (var i = 0; i < properties.length; i++) {
        current = current[properties[i]];
    }
    return current;
}