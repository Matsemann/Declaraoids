var comparisons = ["NotEquals", "Equals", "LessThan", "GreaterThan", "Includes"]

module.exports = function (query) {

    var {findQuery, whereQuery} = splitQuery(query);

    var find = generateFind(findQuery);
    var where = generateWhere(whereQuery);

    return {
        find,
        where
    }
};

function splitQuery(query) {
    var parts = query.split('Where');

    var findQuery = parts[0].substring(4);
    var whereQuery = parts[1];

    return {
        findQuery,
        whereQuery
    };
}

function generateFind(findQuery) {
    return findQuery.split('And').map(convertBackToCamelCase);
}

function generateWhere(whereQuery) {
    if (!whereQuery) {
        return [];
    }

    var parts = whereQuery.split('And');

    return parts.map(part => {
        var comparison = comparisons.find(c => part.includes(c));
        var split = part.split(comparison);

        return {
            property: convertBackToCamelCase(split[0]),
            comparison: comparison.toLowerCase(),
            input: lowerCaseFirst(split[1])
        };
    });

}

function convertBackToCamelCase(string) {
    return string.split('_').map(lowerCaseFirst).join('_');
}

function lowerCaseFirst(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}