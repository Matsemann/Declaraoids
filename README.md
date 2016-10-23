# Array Find

## Speed test

Current results. Big overhead for small arrays, not too bad when the array grows in size

Result with list of 50 items
Simple filter&map x 1,197,223 ops/sec ±1.17% (87 runs sampled)
Simple finder x 43,167 ops/sec ±1.27% (88 runs sampled)
Fastest is Simple filter&map

Result with list of 100000 items
Simple filter&map x 10.68 ops/sec ±2.02% (31 runs sampled)
Simple finder x 7.16 ops/sec ±1.71% (22 runs sampled)
Fastest is Simple filter&map

Result with list of 50 items
Advanced filter&map x 1,055,207 ops/sec ±1.01% (88 runs sampled)
Advanced finder x 34,588 ops/sec ±1.25% (89 runs sampled)
Advanced finder CACHED x 60,996 ops/sec ±1.18% (91 runs sampled)
Fastest is Advanced filter&map

Result with list of 100000 items
Advanced filter&map x 16.37 ops/sec ±2.23% (44 runs sampled)
Advanced finder x 8.69 ops/sec ±1.11% (26 runs sampled)
Advanced finder CACHED x 8.82 ops/sec ±1.52% (26 runs sampled)
Fastest is Advanced filter&map