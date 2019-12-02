const Piece = require("../models/Piece");
const RookPromoted = require("./RookPromoted");

class Rook extends Piece {
  constructor(playerIndex, position) {
    super(playerIndex, position);

    this.promoteTo = RookPromoted;
    this.movements = [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
      [0, 6],
      [0, 7],
      [0, 8],
      [-1, 0],
      [-2, 0],
      [-3, 0],
      [-4, 0],
      [-5, 0],
      [-6, 0],
      [-7, 0],
      [-8, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
      [6, 0],
      [7, 0],
      [8, 0],
      [0, -1],
      [0, -2],
      [0, -3],
      [0, -4],
      [0, -5],
      [0, -6],
      [0, -7],
      [0, -8]
    ];
  }
  getName() {
    return 'Rook';
  }
  getShortName() {
    return `${this.playerIndex}R_`;
  }
}
module.exports = Rook;
