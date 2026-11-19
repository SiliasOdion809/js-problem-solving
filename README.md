# js-problem-solving

# JavaScript Object & Closure Challenges

Five JavaScript problems on object manipulation, recursion, and closures. Each solution is a standalone function with no dependencies.

## Problems

| # | Problem | Difficulty | Key Concepts |
|---|---------|------------|--------------|
| 1 | [Deep Equal](./01-deepEqual.js) | Easy | Recursion, `Object.keys`, `typeof` checks |
| 2 | [Object Diff](./02-diffObjects.js) | Medium | `Set` for key comparison, building a result object |
| 3 | [Deep Freeze](./03-deepFreeze.js) | Medium | Recursion, `Object.freeze`, `Object.values` |
| 4 | [Private Counter Factory](./04-createCounter.js) | Easy | Closures, getters, encapsulation |
| 5 | [Schema Validator](./05-validateSchema.js) | Medium | `Object.hasOwn`, `typeof`, `Object.entries` |

## Running the Code

Requires Node.js 16.9+ (for `Object.hasOwn`).

```bash
node 01-deepEqual.js
node 02-diffObjects.js
node 03-deepFreeze.js
node 04-createCounter.js
node 05-validateSchema.js
```

Each file ends with `console.log` examples whose expected output is in a trailing comment.

## Solutions

### 1. Deep Equal
`deepEqual(objA, objB)` returns `true` if two values have the same keys and values recursively, without using `JSON.stringify`.

- **Approach:** Short-circuit on `===`, reject non-objects and `null`, compare key counts, then recurse on each key.
- **Edge cases handled:** `null` (since `typeof null === "object"`), arrays vs. plain objects, and `{ a: undefined }` vs. `{ b: 1 }` via an own-property check.
- **Complexity:** O(n) in the total number of nested properties.
- **Not handled:** `Date`, `Map`, `Set`, `NaN`, circular references.

### 2. Object Diff
`diffObjects(oldObj, newObj)` returns `{ added, removed, changed }` for top-level keys only.

- **Approach:** Build a `Set` of keys per object. Keys only in the new object are `added`, keys only in the old object are `removed`, and shared keys with different values are `changed` as `{ from, to }`.
- **Notes:** All three buckets are always present, even when empty. Values are compared with `!==`, so nested objects are compared by reference.
- **Complexity:** O(n + m) for n old keys and m new keys.

### 3. Deep Freeze
`deepFreeze(obj)` recursively freezes an object and all nested objects, then returns it.

- **Approach:** Skip primitives and `null`, freeze the current object, then recurse over `Object.values`. A `WeakSet` tracks visited objects, so circular references and partially frozen trees are handled.
- **Notes:** Writes to a frozen object are silently ignored in sloppy mode and throw a `TypeError` in strict mode.
- **Complexity:** O(n) in the number of nested objects.

### 4. Private Counter Factory
`createCounter()` returns `{ increment, decrement, value }` with the count kept private via closure.

- **Approach:** `count` is a local variable. The returned methods close over it, and `value` is exposed as a getter with no setter.
- **Notes:** `counter.count` is `undefined`, and each call to `createCounter()` creates an independent counter.
- **Complexity:** O(1) per operation.

### 5. Schema Validator
`validateSchema(obj, schema)` returns an array of error messages, or `[]` if the object is valid.

- **Approach:** Loop over `Object.entries(schema)`. A key missing from `obj` produces `"key: missing property"`, and a wrong type produces `"key: expected X, got Y"`.
- **Notes:** Uses `Object.hasOwn` so inherited properties don't count as present. Extra keys in `obj` are ignored. `typeof null` and arrays both report `'object'`.
- **Complexity:** O(k) for k schema keys.

## Key Takeaways

- `typeof null === "object"`, so always check for `null` explicitly.
- `Object.freeze` is shallow, so deep immutability needs recursion.
- Closures give true privacy, whereas properties on `this` are always reachable.
- Prefer own-property checks (`Object.hasOwn`) over `in` when validating data.