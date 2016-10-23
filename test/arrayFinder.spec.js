var assert = require('assert');
var arrayFinder = require('../src/arrayFinder');

var p1 = { name: "Mats", age: 25, sex: "M", address: { city: "Oslo"} };
var p2 = { name: "Kåre", age: 31, sex: "M", address: { city: "Bergen"} };
var p3 = { name: "Linn", age: 22, sex: "F", address: { city: "Bergen"} };


describe('ArrayFinder', () => {

    it('calls underlying array when not starting with find', () => {
        var arr = arrayFinder([p1, p2, p3]);

        assert.deepEqual(p3, arr[2]);
        assert.equal(3, arr.length);
    });

    describe('find variables', () => {
        it('return all when no find specified', () => {
            var arr = arrayFinder([p1, p2, p3]);
            var result = arr.find();

            assert.deepEqual(result, [p1, p2, p3])
        });

        it('should find a single variable, name', () => {
            var arr = arrayFinder([p1, p2, p3]);
            var result = arr.findName();

            var expected = ["Mats", "Kåre", "Linn"];

            assert.deepEqual(result, expected)
        });

        it('should filter', () => {
            var arr = arrayFinder([p1, p2, p3]);
            var result = arr.findNameWhereAgeEqualsX({x: 25});

            var expected = ["Mats"];

            assert.deepEqual(result, expected)
        });
    });
});