# Array Find

## Speed test

Current results. Big overhead for small arrays, not too bad when the array grows in size

Result with list of 50 items
Simple filter&map x 1,200,555 ops/sec ±1.10% (86 runs sampled)
Simple finder x 37,043 ops/sec ±1.25% (87 runs sampled)
Fastest is Simple filter&map

Result with list of 100000 items
Simple filter&map x 10.80 ops/sec ±2.23% (31 runs sampled)
Simple finder x 6.44 ops/sec ±2.11% (20 runs sampled)
Fastest is Simple filter&map

Result with list of 50 items
Advanced filter&map x 1,054,367 ops/sec ±1.12% (88 runs sampled)
Advanced finder x 30,388 ops/sec ±1.10% (89 runs sampled)
Advanced finder CACHED x 48,282 ops/sec ±1.09% (90 runs sampled)
Fastest is Advanced filter&map

Result with list of 100000 items
Advanced filter&map x 15.86 ops/sec ±3.42% (43 runs sampled)
Advanced finder x 8.10 ops/sec ±1.37% (25 runs sampled)
Advanced finder CACHED x 8.11 ops/sec ±1.15% (24 runs sampled)
Fastest is Advanced filter&map