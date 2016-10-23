# Array Find

## Speed test

Current results. Big overhead for small arrays, not too bad when the array grows in size

Result with list of 50 items
Simple filter&map x 1,231,976 ops/sec ±1.34% (88 runs sampled)
Simple finder x 44,778 ops/sec ±1.07% (90 runs sampled)
Fastest is Simple filter&map

Result with list of 100000 items
Simple filter&map x 10.88 ops/sec ±1.72% (31 runs sampled)
Simple finder x 7.36 ops/sec ±1.17% (23 runs sampled)
Fastest is Simple filter&map

Result with list of 50 items
Advanced filter&map x 1,093,120 ops/sec ±0.91% (91 runs sampled)
Advanced finder x 36,129 ops/sec ±0.84% (88 runs sampled)
Advanced finder CACHED x 63,622 ops/sec ±0.95% (90 runs sampled)
Fastest is Advanced filter&map

Result with list of 100000 items
Advanced filter&map x 17.02 ops/sec ±2.41% (46 runs sampled)
Advanced finder x 8.68 ops/sec ±1.63% (26 runs sampled)
Advanced finder CACHED x 9.03 ops/sec ±1.30% (27 runs sampled)
Fastest is Advanced filter&map