function diffObjects(oldObj, newObj) {
  const result = { added: {}, removed: {}, changed: {} };

  const oldKeys = new Set(Object.keys(oldObj));
  const newKeys = new Set(Object.keys(newObj));

  // Keys only in newObj were added
  for (const key of newKeys) {
    if (!oldKeys.has(key)) {
      result.added[key] = newObj[key];
    }
  }

  for (const key of oldKeys) {
    if (!newKeys.has(key)) {
      // Keys only in oldObj were removed
      result.removed[key] = oldObj[key];
    } else if (oldObj[key] !== newObj[key]) {
      // Keys in both with different values changed
      result.changed[key] = { from: oldObj[key], to: newObj[key] };
    }
  }

  return result;
}

console.log(diffObjects(
  { name: 'Setemi', role: 'Engineer', country: 'Jamaica' },
  { name: 'Setemi', role: 'Senior Engineer', city: 'Kingston' }
))
// { added: { city: 'Kingston' }, removed: { country: 'Jamaica' }, changed: { role: { from: 'Engineer', to: 'Senior Engineer' } } }