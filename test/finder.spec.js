var assert = require('assert');
var finder = require('../src/finder.js');

var p1 = { name: "Mats", age: 25, sex: "M", address: { city: "Oslo"} };
var p2 = { name: "Kåre", age: 31, sex: "M", address: { city: "Bergen"} };
var p3 = { name: "Linn", age: 22, sex: "F", address: { city: "Bergen"} };


describe('Finder', () => {
    var array2 = finder([p1, p2]);
    var array3 = finder([p1, p2, p3]);

    it('calls underlying array when not starting with find', () => {
        assert.deepEqual(p3, array3[2]);
        assert.equal(3, array3.length);
    });

    describe('find variables', () => {
        it('return all when no find specified', () => {
            var result = array3.find();

            assert.deepEqual(result, [p1, p2, p3])
        });

        it('should find a single variable, name', () => {
            var result = array3.findName();

            var expected = [{ name: "Mats"}, { name: "Kåre"}, {name: "Linn"}];

            assert.deepEqual(result, expected)
        });

        it('should find a multiple variables, name and age', () => {
            var result = array2.findNameAndAge();
            var expected = [{
                name: "Mats",
                age: 25
            }, {
                name: "Kåre",
                age: 31
            }];
            assert.deepEqual(result, expected)
        });
        it('should find nested variables', () => {
            var result = array2.findNameAndAddress_City();
            var expected = [{
                name: "Mats",
                address_city: "Oslo"
            }, {
                name: "Kåre",
                address_city: "Bergen"
            }];
            assert.deepEqual(result, expected)
        });
        it('should find supernested variables', () => {
            var input = {
                levelOne: {
                    levelTwo: {
                        levelThree: "hey"
                    }
                }
            };
            var result = finder([input]).findLevelOne_LevelTwo_LevelThree();
            var expected = [{
                levelOne_levelTwo_levelThree: "hey"
            }];
            assert.deepEqual(result, expected)
        });
    });
});