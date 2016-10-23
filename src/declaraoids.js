var parser = require('./parser');

module.exports = new Proxy({}, {
    get (target, property) {
        return finder(property);
    }
});

function finder(query) {
    var parsed = parser(query);

    var mapFunc = generateMapFunction(parsed);
    var filterFunc = generateFilterFunction(parsed);

    return (array, args) => {
        return array
            .filter(filterFunc(args))
            .map(mapFunc);
    }
}

function generateMapFunction(parsed) {
    if (parsed.find.length == 0) {
        return e => e;
    }

    if (parsed.find.length == 1) {
        return e => findNested(e, parsed.find[0].prop);
    }

    return e => {
        var obj = {};
        parsed.find.forEach(find => {
            obj[find.name] = findNested(e, find.prop);
        });
        return obj;
    };
}


var functions = {
    equals: (value, compareWith) => value === compareWith,
    noteequals: (value, compareWith) => value !== compareWith,
    lessthan: (value, compareWith) => value < compareWith,
    greaterthan: (value, compareWith) => value > compareWith,
    includes: (value, compareWith) => value.includes(compareWith)
};

function generateFilterFunction(parsed) {
    var filters = [];

    parsed.where.forEach(where => {
        var func = functions[where.comparison];

        filters.push((e, args) => {
            var value = findNested(e, where.property);
            var compareWith = args[where.input];
            return func(value, compareWith);
        })
    });

    return args => e => filters.every(f => f(e, args));

}

function findNested(start, path) {
    if (!path.includes('_')) {
        return start[path];
    }

    var properties = path.split('_');

    var current = start;
    for (var i = 0; i < properties.length; i++) {
        current = current[properties[i]];
    }
    return current;
}