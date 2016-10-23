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

    describe('where clause', () => {
        it('a single equals clause', () => {
            var query = 'findSomethingWhereFirstNameEqualsX';
            var expected = [{
                property: 'firstName',
                comparison: 'equals',
                input: 'x'
            }];
            assert.deepEqual(parser(query).where, expected);
        });
        it('multiple clauses', () => {
            var input = 'findSomethingWhereFirstNameNotEqualsFirstNameAndLastNameEqualsLast';

            var expected = [{
                property: 'firstName',
                comparison: 'notequals',
                input: 'firstName'
            }, {
                property: 'lastName',
                comparison: 'equals',
                input: 'last'
            }];
            assert.deepEqual(parser(input).where, expected);
        });
        it('where on a nested property', () => {
            var input = 'findSomethingWhereAddress_StreetNameIncludesStreetName';

            var expected = [{
                property: 'address_streetName',
                comparison: 'includes',
                input: 'streetName'
            }];

            assert.deepEqual(parser(input).where, expected);
        });
    });

});