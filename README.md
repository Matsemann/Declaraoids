# Array Find

## Speed test

Current results. Big overhead for small arrays, not too bad when the array grows in size

Result with list of 50 items
Simple filter&map x 1,210,821 ops/sec ±2.21% (87 runs sampled)
Simple finder x 27,997 ops/sec ±3.35% (86 runs sampled)
Fastest is Simple filter&map

Result with list of 100000 items
Simple filter&map x 10.88 ops/sec ±2.15% (31 runs sampled)
Simple finder x 5.43 ops/sec ±3.29% (18 runs sampled)
Fastest is Simple filter&map

Result with list of 50 items
Advanced filter&map x 1,107,728 ops/sec ±0.72% (91 runs sampled)
Advanced finder x 25,750 ops/sec ±0.66% (92 runs sampled)
Advanced finder CACHED x 36,014 ops/sec ±2.46% (90 runs sampled)
Fastest is Advanced filter&map

Result with list of 100000 items
Advanced filter&map x 17.04 ops/sec ±3.02% (46 runs sampled)
Advanced finder x 7.73 ops/sec ±1.04% (24 runs sampled)
Advanced finder CACHED x 7.50 ops/sec ±6.09% (23 runs sampled)
Fastest is Advanced filter&map