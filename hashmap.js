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

  get(key) {
    let hashValue = hash(key, this.#capacity);
    for (const node of this.#buckets[hashValue].makeListIterator()) {
      if (node.key == key) {
        return node.value;
      }
    }
    return null;
  }

  has(key) {
    let hashValue = hash(key, this.#capacity);
    for (const node of this.#buckets[hashValue].makeListIterator()) {
      if (node.key == key) {
        return true;
      }
    }
    return false;
  }

  remove(key) {
    let hashValue = hash(key, this.#capacity);
    let index = 0;
    for (const node of this.#buckets[hashValue].makeListIterator()) {
      if (node.key == key) {
        this.#buckets[hashValue].removeAt(index);
        this.#size -= 1;
        return true;
      }
      index += 1;
    }
    return false;
  }

  length() {
    return this.#size;
  }

  clear() {
    this.#buckets = [];
    this.#size = 0;
    for (let i = 0; i < this.#capacity; i++) {
      this.#buckets.push(new List());
    }
  }

  keys() {
    let keyArray = [];
    for (const bucket of this.#buckets) {
      for (const node of bucket.makeListIterator()) {
        keyArray.push(node.key);
      }
    }
    return keyArray;
  }

  values() {
    let valueArray = [];
    for (const bucket of this.#buckets) {
      for (const node of bucket.makeListIterator()) {
        valueArray.push(node.value);
      }
    }
    return valueArray;
  }

  entries() {
    let entries = [];
    for (const bucket of this.#buckets) {
      for (const node of bucket.makeListIterator()) {
        entries.push([node.key, node.value]);
      }
    }
    return entries;
  }
}
