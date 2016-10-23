var assert = require('assert');
var Benchmark = require('benchmark');

var finder = require('../src/finder.js');

describe.only('Speed comparison', () => { // remove skip to include speed tests

    function simpleFilterMap(data) {
        return data
            .filter(p => p.age > 500)
            .map(p => p.name);
    }

    function simpleFinder(data) {
        return finder.findNameWhereAgeGreaterThanX(data, {x: 500});
    }

    function advancedFilterMap(data) {
        return data
            .filter(p => p.age > 500)
            .filter(p => p.nested.nested3 < 750)
            .map(p => ({name: p.name, custom: p.nested.nested2}));
    }

    function advancedFinder(data) {
        return finder
            .findNameAndNested_Nested2AsCustomWhereAgeGreaterThanXAndNested_Nested3LessThanY(data, {
                x: 500,
                y: 750
            });
    }

    function completeFunction(size) {
        return function() {
            console.log("Result with list of " + size + " items");
            for (var i = 0; i < this.length; i++) {
                console.log(this[i].toString())
            }

            console.log('Fastest is ' + this.filter('fastest').map('name'));
        }
    }

    describe('Check that they return equal', () => {
        it('Simple query', () => {
            var data = generateData(1000);

            var filterMap = simpleFilterMap(data);
            var found = simpleFinder(data);

            assert.deepEqual(filterMap, found);
        });
        it('Advanced query', () => {
            var data = generateData(1000);

            var filterMap = advancedFilterMap(data);
            var found = advancedFinder(data);

            assert.deepEqual(filterMap, found);
        });
    });


    it('Simple query', function () {
        this.timeout(60000);

        simpleQuery(50);
        simpleQuery(100000);

        function simpleQuery(size) {
            var data = generateData(size);
            var suite = new Benchmark.Suite;

            suite
                .add('Simple filter&map', function () {
                    simpleFilterMap(data);
                })
                .add('Simple finder', function () {
                    simpleFinder(data);
                })
                .on('complete', completeFunction(size))
                .run();

        }
    });


    it('Advanced query', function () {
        this.timeout(60000);

        advancedQuery(50);
        advancedQuery(100000);

        function advancedQuery(size) {
            var data = generateData(size);
            var suite = new Benchmark.Suite;

            var cachedFinder = finder.findNameAndNested_Nested2AsCustomWhereAgeGreaterThanXAndNested_Nested3LessThanY;

            suite
                .add('Advanced filter&map', function () {
                    advancedFilterMap(data);
                })
                .add('Advanced finder', function () {
                    advancedFinder(data);
                })
                .add('Advanced finder CACHED', function () {
                    cachedFinder(data, { x: 500, y: 750});
                })
                .on('complete', completeFunction(size))
                .run();

        }
    });
});

function generateData(size) {
    var data = [];

    for (var j = 0; j < size; j++) {
        data.push({
            name: "Name" + j,
            age: j,
            nested: {
                nested2: "yeye",
                nested3: j
            }
        })
    }

    return data;
}