var assert = require('assert');
var parser = require('../src/parser');

// Query should be on the form findNameAndAgeAsRealAgeWhereAddress_CityEqualsCity

describe('Parser', () => {
    describe('find clause', () => {
        it('nothing when nothing specified', () => {
            var expected = [];
            assert.deepEqual(parser('find').find, expected);
        });

        it('finds a single variable', () => {
            var expected = ['name'];
            var result = parser('findName').find;
            assert.deepEqual(result.map(e => e.prop), expected);
        });

        it('finds multiple variables', () => {
            var result = parser('findNameAndAddress').find;
            var expected = ['name', 'address'];
            assert.deepEqual(result.map(e => e.prop), expected);
        });

        it('assumes camelCase', () => {
            var result = parser('findNameAndStreetAddress').find;
            var expected = ['name', 'streetAddress'];
            assert.deepEqual(result.map(e => e.prop), expected);
        });

        it('finds nested properties and camelCases them', () => {
            var result = parser('findLastNameAndAddress_HouseNumber').find;
            var expected = ['lastName', 'address_houseNumber'];
            assert.deepEqual(result.map(e => e.prop), expected);
        });

        it('can rename the selected properties', () => {
            var result = parser('findLastNameAndAddress_HouseNumberAsHouseNumber').find;
            var expected = [{prop: 'lastName', name: 'lastName'}, {prop: 'address_houseNumber', name: 'houseNumber'}];
            assert.deepEqual(result, expected);
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