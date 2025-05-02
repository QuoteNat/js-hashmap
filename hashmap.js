import { List } from "./linked-list/linked-list.js";

function hash(key, mod) {
  let hashCode = 0;

  const primeNumber = 31;
  for (let i = 0; i < key.length; i++) {
    hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % mod;
  }

  return hashCode;
}

class Pair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

export class HashMap {
  #capacity = 1;
  #size = 0;
  #loadFactor = 1;
  #buckets = [new List()];
  bucketIndexCheck(index) {
    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
  }

  constructor(loadFactor = 1) {
    this.#loadFactor = loadFactor;
  }

  grow() {
    let tempBuckets = [];
    this.#capacity *= 2;
    for (let i = 0; i < this.#capacity; i++) tempBuckets.push(new List());
    for (let i = 0; i < this.#buckets.length; i++) {
      let bucket = this.#buckets[i];
      const iter = bucket.makeListIterator();
      for (const pair of iter) {
        let hashValue = hash(pair.key, this.#capacity);
        tempBuckets[hashValue].append(pair);
      }
    }

    this.#buckets = tempBuckets;
  }

  set(key, value) {
    this.#size += 1;
    if (this.#capacity * this.#loadFactor < this.#size) {
      this.grow();
    }
    let hashValue = hash(key, this.#capacity);
    this.#buckets[hashValue].append(new Pair(key, value));
  }

  toString() {
    let string = "";
    for (const bucket of this.#buckets) {
      string += bucket.toString() + "\n";
    }
    return string;
  }
}
