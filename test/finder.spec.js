var assert = require('assert');
var finder = require('../src/finder.js');

var p1 = { name: "Mats", age: 25, sex: "M", address: { city: "Oslo"} };
var p2 = { name: "Kåre", age: 31, sex: "M", address: { city: "Bergen"} };
var p3 = { name: "Linn", age: 22, sex: "F", address: { city: "Bergen"} };


describe('Finder', () => {
    var impl = finder([p1, p2, p3]);

    it('calls underlying array when not starting with find', () => {
        assert.deepEqual(p3, impl[2]);
        assert.equal(3, impl.length);
    });

    it('echoes back stuff starting with find', () => {
        assert.equal('findName', impl.findName);
        assert.equal('findWaldo', impl.findWaldo);
    });
});