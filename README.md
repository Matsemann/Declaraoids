# Declaraoids-Find

* Do you think imperative programming sucks?
* Do you think functional programming isn't declarative enough?
* Do you want the computer to do your job for you?
* Then look no further!


## What?

Using the power of [ES6 Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) to give you declarative programming on steroids.

Given,

```javascript
var persons = [
    { name: "Mats", age: 25, sex: "M", address: { city: "Oslo"} },
    { name: "Kåre", age: 31, sex: "M", address: { city: "Bergen"} },
    { name: "Linn", age: 22, sex: "F", address: { city: "Bergen"} }
]
```

why do this,
```javascript
var result = persons
    .filter(p => p.age > 23)
    .filter(p => p.address.city == 'Bergen')
    .map(p => ({name: p.name, gender: p.sex}));
// => [ { "name": "Kåre" , "gender": "M"} ], note the change from sex to gender
```

when you can do this?
```javascript
var declaraoids = require('./declaraoids');
var result = declaraoids.findNameAndSexAsGenderWhereAgeGreaterThanXAndAddress_CityEqualsCity(persons, {x: 23, city: 'Bergen'});
// => [ { "name": "Kåre" , "gender": "M"} ]
```

**Does it get more declarative than that??**

## Wat?[<sup>*</sup>](https://www.destroyallsoftware.com/talks/wat)

Proxies allow us to insert *traps* on objects. This trap looks at the function you try to call
(which obviously doesn't exist) and then creates it dynamically using the function name. For other fun with proxies, see [proxy-fun](https://github.com/mikaelbr/proxy-fun).

## Examples

A huge example showcasing how fantastic this is

```javascript
var data = [
    {
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
    },
    //... and lots of others
];

var result = declaraoids.findTitleAndAuthor_NameAsAuthorWhereAuthor_Address_ZipEqualsZipAndContent_IngressIncludesXAndContent_TotalWordsGreaterThanWords(data, {zip: '0567', x: 'cool', words: 400});
assert.deepEqual(result, [{title: "A cool article", author: "Mats"}]);
```

Examples on usages from `test/finder.spec.js`:

```javascript
declaraoids.find(persons); // returns the whole array
declaraoids.findName(persons); // ["Mats", "Kåre", "Linn"]
declaraoids.findNameAndAge(persons); // [{ name: "Mats", age: 25 }, { name: "Kåre", age: 31 }, { name: "Linn", age: 22 }]

var input = { levelOne: { levelTwo: { levelThree: { levelFour: "hey"}, alsoLevelThree: "three"}}};
declaraoids.findLevelOne_LevelTwo_LevelThreeAsHelloKittyAndLevelOne_LevelTwo_AlsoLevelThreeAsShort([input]); // [{ helloKitty: { levelFour: "hey" }, short: "three" }]

declaraoids.findWhereNameEqualsX(persons, {x: "Mats"}); // [{ name: "Mats", age: 25, address: { city: "Oslo"}  }]
declaraoids.findWhereSexEqualsGenderAndAgeGreaterThanNr(persons, {gender: "M", nr: 30}); // { name: "Kåre", age: 30, address: { city: "Bergen"} }
```

---

## Syntax

```
<query>: find(<selects>)(Where<conditions>)
```

### Selects

```
<selects>: <select>(And<select>)*
<select>: <property>(As<name>)
```

* The select can be empty, it will then select the whole objects similar to `select *` in SQL.
* Can have multiple selects separated by `And`, like `NameAndAge`.
* Can optionally rename a select using `As`, like `NameAsFullName`
* When there is only a single select, the output is flattened

### Where

```
<conditions>: <condition>(And<condition>)*
<condition>: <property><comparison><parameter>
<comparison>: Equals|NotEquals|LessThan|GreaterThan|Includes
```

* The Where is optional, will select all elements in the array if not present
* Can have multiple conditions separated by `And`
* A condition consists of the property to be compared, the comparison, and the name of the parameter to the function.
Like `NameEqualsX`, will compare `name` on each object in the array with the value `x` from the passed object.


### Property
````
<property>: [a-zA-Z0-9_]*
```

* The property to select or compare.
* A normal property name, like `FirstName`, `Address`
* Underscores, `_`, allows arbitrary nesting. Like `Address_City` is a lookup on `object['address']['city']`
* So don't use underscores in the properties of the objects being mapped/filtered.
* Assumes properties are camelCased, so `FirstName` will look up `object['firstName']`


## Arrays

You can even wrap your arrays in this, allowing you to use them as normal arrays and then tap into the power of Declaraoids-Find

```javascript
var arr = arrayFinder(persons);
arr[2]; // { name: "Linn", age: 22 ....
arr.length; // 3
arr.findNameWhereAgeEqualsX({x: 25}); // ["Mats"]
```

## Speed tests

Current results. Big overhead for small arrays, not too bad when the array grows in size.
`filter&map` is the same logic implemented in pure JS, the results containing `declaraoids` are using this library.

See `test/speed.spec.js` for how it's tested

```
Result with list of 50 items
Simple filter&map x 1,231,976 ops/sec ±1.34% (88 runs sampled)
Simple declaraoids x 44,778 ops/sec ±1.07% (90 runs sampled)
Fastest is Simple filter&map

Result with list of 100000 items
Simple filter&map x 10.88 ops/sec ±1.72% (31 runs sampled)
Simple declaraoids x 7.36 ops/sec ±1.17% (23 runs sampled)
Fastest is Simple filter&map

Result with list of 50 items
Advanced filter&map x 1,093,120 ops/sec ±0.91% (91 runs sampled)
Advanced declaraoids x 36,129 ops/sec ±0.84% (88 runs sampled)
Advanced declaraoids CACHED x 63,622 ops/sec ±0.95% (90 runs sampled)
Fastest is Advanced filter&map

Result with list of 100000 items
Advanced filter&map x 17.02 ops/sec ±2.41% (46 runs sampled)
Advanced declaraoids x 8.68 ops/sec ±1.63% (26 runs sampled)
Advanced declaraoids CACHED x 9.03 ops/sec ±1.30% (27 runs sampled)
Fastest is Advanced filter&map
```

## Future plans

Now that we have solved the `find`-part of your day, we will have to expand the API in other directions. Issues with ideas are welcome.

Current plans include:
* `declaraoids.generateCrudApp();`
* `declaraoids.makeDinnerAndDoTheDishes();`
* `declaraoids.createDnsConfigThatDoesntRelyOnASingleProviderForMyMultiBillionDollarCompany()`
* `declaraoids.singularity({thisAlgorithmBecomingSkynetCost: 999999});`


## Should I use it?

> By asking that your rights to push code to production were automagically removed.

But seriously, this is how we do it in [Java-land](http://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods.query-creation).