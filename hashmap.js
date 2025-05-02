import List from "./linked-list/linked-list.js";

export class HashMap {
  #bucketIndexCheck(index) {
    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
  }
}
