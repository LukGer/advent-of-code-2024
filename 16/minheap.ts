export interface MinHeapNode<T> {
  score: number;
  node: T;
}

export class MinHeap<T> {
  heap: MinHeapNode<T>[];
  constructor() {
    this.heap = [];
  }

  /**
   * inserts an element and heapifies it until it is in the correct location
   */
  insert(element: MinHeapNode<T>) {
    this.heap.push(element);
    let index = this.heap.length - 1;

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index].score >= this.heap[parentIndex].score) break;
      [this.heap[index], this.heap[parentIndex]] = [
        this.heap[parentIndex],
        this.heap[index],
      ];
      index = parentIndex;
    }
  }

  /**
   * gets the smallest element, which is at the beginning, then heapifies
   */
  extractMin() {
    if (this.heap.length === 1) return this.heap.pop() as MinHeapNode<T>;
    const min = this.heap[0];
    this.heap[0] = this.heap.pop() as MinHeapNode<T>;
    let index = 0;

    while (true) {
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;
      let smallest = index;

      if (
        leftChild < this.heap.length &&
        this.heap[leftChild].score < this.heap[smallest].score
      )
        smallest = leftChild;
      if (
        rightChild < this.heap.length &&
        this.heap[rightChild].score < this.heap[smallest].score
      )
        smallest = rightChild;
      if (smallest === index) break;
      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      index = smallest;
    }

    return min;
  }

  /**
   * return the size of the heap
   */
  size() {
    return this.heap.length;
  }
}
