const Piece = require("../models/Piece");
const GoldGeneral = require("./GoldGeneral");

class BishopPromoted extends Piece {
  constructor(playerIndex, position) {
    super(playerIndex, position);

    this.promoteTo = GoldGeneral;
    this.movements = [
      [1, -1],
      [2, -2],
      [3, -3],
      [4, -4],
      [5, -5],
      [6, -6],
      [7, -7],
      [8, -8],
      [1, 1],
      [2, 2],
      [3, 3],
      [4, 4],
      [5, 5],
      [6, 6],
      [7, 7],
      [8, 8],
      [-1, 1],
      [-2, 2],
      [-3, 3],
      [-4, 4],
      [-5, 5],
      [-6, 6],
      [-7, 7],
      [-8, 8],
      [-1, -1],
      [-2, -2],
      [-3, -3],
      [-4, -4],
      [-5, -5],
      [-6, -6],
      [-7, -7],
      [-8, -8],
      [-1, 1],
      [0, 1],
      [1, 1],
      [-1, 0],
      [1, 0],
      [0, -1]
    ];
  }

  getShortName() {
    return `${this.playerIndex}*B`;
  }
  getMovements() {
    return this.movements;
  }
}

module.exports = BishopPromoted;
