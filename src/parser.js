module.exports = function (query) {
    var findQuery = query.substring(4);
    var find = findQuery.split('And').map(convertBackToCamelCase);

    return {
        find
    }
};

function convertBackToCamelCase(string) {
    return string.split('_').map(lowerCaseFirst).join('_');
}

function lowerCaseFirst(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}