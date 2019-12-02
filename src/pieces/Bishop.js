const Piece = require("../models/Piece");
const BishopPromoted = require("./BishopPromoted");

class Bishop extends Piece {
  constructor(playerIndex, position) {
    super(playerIndex, position);

    this.promoteTo = BishopPromoted;
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
      [-8, -8]
    ];
  }

  getName() {
    return 'Bishop';
  }
  
  getShortName() {
    return `${this.playerIndex}B_`;
  }
  
  getMovements() {
    return this.movements;
  }
}

module.exports = Bishop;
