class BasesPath {
  // number of bases
  range: number;
  // adjacencies of each base
  adjacenciesMatrix: number[][];
  private bases: number[];
  // distances from source
  distances: number[];
  // distance to final base
  minDistanceToEnd: number;

  constructor(N: number, adjacencies: number[][]) {
    this.range = N;
    this.adjacenciesMatrix = adjacencies;
    const nodes: number[] = [];
    for (let i = 0; i < N; i++) {
      nodes.push(i);
    }
    this.bases = nodes;
    this.distances = [...this.adjacenciesMatrix[0]];
    this.calcMinDistance();
    this.minDistanceToEnd = this.distances[this.range - 1];
  }

  calcMinDistance() {
    // iterate through the range
    for (let j = 1; j < this.range; j++) {
      //minimun distance
      let minValue: number = Number.MAX_VALUE;
      let minBase: number = 0;

      //search min distance
      for (let i = 0; i < this.range; i++) {
        if (this.bases[i] > 0) {
          if (this.distances[i] > 0 && this.distances[i] < minValue) {
            minValue = this.distances[i];
            minBase = i;
          }
        }
      }

      this.bases[minBase] = 0;

      // update distances
      for (let i = 1; i < this.range; i++) {
        if (this.adjacenciesMatrix[minBase][i] > 0) {
          if (
            this.distances[i] <= 0 ||
            this.distances[minBase] + this.adjacenciesMatrix[minBase][i] <
              this.distances[i]
          ) {
            this.distances[i] = minValue + this.adjacenciesMatrix[minBase][i];
          }
        }
      }
    }
  }
}

let basesInfo = new BasesPath(4, [
  [0, 10, 20, 0],
  [0, 0, 0, 50],
  [0, 0, 0, 10],
  [0, 0, 0, 0],
]);

//basesInfo.calcMinDistance();
console.log(basesInfo.adjacenciesMatrix, basesInfo.distances, basesInfo.range);

let bases2 = new BasesPath(7, [
  [0, 10, 18, 0, 0, 0, 0],
  [0, 0, 6, 0, 3, 1, 1],
  [0, 0, 0, 3, 0, 20, 1],
  [0, 0, 2, 0, 0, 0, 2],
  [0, 0, 0, 6, 0, 0, 10],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 10, 0, 0, 5, 0],
]);

let bases4 = new BasesPath(9, [
  [0, 4, 0, 0, 0, 0, 0, 8, 0],
  [4, 0, 8, 0, 0, 0, 0, 11, 0],
  [0, 8, 0, 7, 0, 4, 0, 0, 2],
  [0, 0, 7, 0, 9, 14, 0, 0, 0],
  [0, 0, 0, 9, 0, 10, 0, 0, 0],
  [0, 0, 4, 14, 10, 0, 2, 0, 0],
  [0, 0, 0, 0, 0, 2, 0, 1, 6],
  [8, 11, 0, 0, 0, 0, 1, 0, 7],
  [0, 0, 2, 0, 0, 0, 6, 7, 0],
]);

//bases2.calcMinDistance();
console.log(bases2.distances);

//bases4.calcMinDistance();
console.log(bases4.distances);
