var assert = require('assert');
var parser = require('../src/parser.js');

// Query should be on the form findNameAndAgeWhereAddress_CityEqualsCity

describe('Parser', () => {
    describe('find clause', () => {
        it('finds a single variable', () => {
            var expected = ['name'];
            assert.deepEqual(parser('findName').find, expected);
        });
        it('finds multiple variables', () => {
            var expected = ['name', 'address'];
            assert.deepEqual(parser('findNameAndAddress').find, expected);
        });
        it('assumes camelCase', () => {
            var expected = ['name', 'streetAddress'];
            assert.deepEqual(parser('findNameAndStreetAddress').find, expected);
        });
        it('finds nested properties and camelCases them', () => {
            var expected = ['name', 'address_houseNumber'];
            assert.deepEqual(parser('findNameAndAddress_HouseNumber').find, expected);
        });
    });
});