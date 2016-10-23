var assert = require('assert');
var declaraoids = require('../src/declaraoids');

var p1 = { name: "Mats", age: 25, sex: "M", address: { city: "Oslo"} };
var p2 = { name: "Kåre", age: 31, sex: "M", address: { city: "Bergen"} };
var p3 = { name: "Linn", age: 22, sex: "F", address: { city: "Bergen"} };


describe('Declaraoids Find', () => {
    var array2 = [p1, p2];
    var array3 = [p1, p2, p3];


    describe('find variables', () => {
        it('return all when no find specified', () => {
            var func = declaraoids.find;
            var result = func(array3);

            assert.deepEqual(result, [p1, p2, p3])
        });

        it('should find a single variable, name', () => {
            var result = declaraoids.findName(array3);

            var expected = ["Mats", "Kåre", "Linn"];

            assert.deepEqual(result, expected)
        });

        it('should find multiple variables, name and age', () => {
            var result = declaraoids.findNameAndAge(array2);
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
            var result = declaraoids.findNameAndAddress_City(array2);
            var expected = [{
                name: "Mats",
                address_city: "Oslo"
            }, {
                name: "Kåre",
                address_city: "Bergen"
            }];
            assert.deepEqual(result, expected)
        });

        describe('supernested', () => {
            var input = {
                levelOne: {
                    levelTwo: {
                        levelThree: {
                            levelFour: "hey"
                        },
                        alsoLevelThree: "three"
                    }
                }
            };

            it('should find supernested variables', () => {
                var result = declaraoids.findLevelOne_LevelTwo_LevelThree([input]);
                var expected = [{
                    levelFour: "hey"
                }];
                assert.deepEqual(result, expected)
            });

            it('should find variables at different levels', () => {
                var result = declaraoids.findLevelOne_LevelTwo_LevelThreeAndLevelOne_LevelTwo_AlsoLevelThree([input]);
                var expected = [{
                    levelOne_levelTwo_levelThree: {
                        levelFour: "hey"
                    },
                    levelOne_levelTwo_alsoLevelThree: "three"
                }];
                assert.deepEqual(result, expected)
            });

            it('should rename nested to shorter', () => {
                var result = declaraoids.findLevelOne_LevelTwo_LevelThreeAsHelloKittyAndLevelOne_LevelTwo_AlsoLevelThreeAsShort([input]);
                var expected = [{
                    helloKitty: {
                        levelFour: "hey"
                    },
                    short: "three"
                }];
                assert.deepEqual(result, expected)
            });
        });

    });

    describe('Filter on where', () => {
        it('equals', () => {
            var result = declaraoids.findWhereNameEqualsName(array3, {name: "Mats"});
            var expected = [p1];
            assert.deepEqual(result, expected)
        });

        it('multiple filters, greater than', () => {
            var result = declaraoids.findWhereSexEqualsGenderAndAgeGreaterThanNr(array3, {gender: "M", nr: 30});
            var expected = [p2];
            assert.deepEqual(result, expected)
        });

        it('nested where', () => {
            var result = declaraoids.findWhereAddress_CityEqualsCity(array3, {city: 'Bergen'});
            var expected = [p2, p3];
            assert.deepEqual(result, expected)
        });
    });

    it('Show-off', () => {
        var data = {
            title: "A cool article",
            author: {
                name: "Mats",
                address: {
                    city: "Oslo",
                    zip: "0567"
                }
            },
            content: {
                ingress: "A cool ingress",
                fullText: "A long text....",
                totalWords: 500
            }
        };

        var result = declaraoids.findTitleAndAuthor_NameAsAuthorWhereAuthor_Address_ZipEqualsZipAndContent_IngressIncludesXAndContent_TotalWordsGreaterThanWords([data], {zip: '0567', x: 'cool', words: 400});
        assert.deepEqual(result, [{title: "A cool article", author: "Mats"}]);
    });
});