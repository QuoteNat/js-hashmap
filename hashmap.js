import List from "./linked-list/linked-list.js";

function hash(key) {
  let hashCode = 0;

  const primeNumber = 31;
  for (let i = 0; i < key.length; i++) {
    hashCode = primeNumber * hashCode + key.charCodeAt(i);
  }

  return hashCode;
}

export class HashMap {
  #capacity = 0;
  #loadFactor = 1;
  #bucketIndexCheck(index) {
    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
  }
}
