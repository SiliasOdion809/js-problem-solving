function deepFreeze(obj) {
  // Only objects (and arrays/functions) can be frozen; skip primitives and null
  if (obj === null || (typeof obj !== "object" && typeof obj !== "function")) {
    return obj;
  }

  // Skip if already frozen (also guards against circular references)
  if (Object.isFrozen(obj)) return obj;

  // Freeze the parent first, then its children
  Object.freeze(obj);

  for (const value of Object.values(obj)) {
    deepFreeze(value);
  }

  return obj;
}

const config = deepFreeze({ api: { baseUrl: 'https://x.com', retries: 3 }, debug: false })
config.api.baseUrl = 'https://changed.com' // should be ignored
config.debug = true                        // should be ignored
console.log(config.api.baseUrl, config.debug) // "https://x.com" false
console.log(Object.isFrozen(config.api))      // true