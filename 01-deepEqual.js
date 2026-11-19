function deepEqual(objA, objB) {
  // Same reference or identical primitive
  if (objA === objB) return true;

  // If either is null or not an object, they can't be deeply equal
  if (
    typeof objA !== "object" || objA === null ||
    typeof objB !== "object" || objB === null
  ) {
    return false;
  }

  // Arrays and plain objects shouldn't match each other
  if (Array.isArray(objA) !== Array.isArray(objB)) return false;

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  // Different number of keys means not equal
  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    // Key must exist in B (own property) and values must match recursively
    if (!Object.prototype.hasOwnProperty.call(objB, key)) return false;
    if (!deepEqual(objA[key], objB[key])) return false;
  }

  return true;
}

console.log(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })) // true
console.log(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } })) // false
console.log(deepEqual({ a: 1 }, { a: 1, b: 2 }))                     // false