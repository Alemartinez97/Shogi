const Piece = require('../models/Piece');
class King extends Piece {
  constructor(playerIndex,position) {
    super(playerIndex,position);
    this.movements = [
      [-1, 1],
      [0, 1],
      [1, 1],
      [-1, 0],
      [1, 0],
      [-1, -1],
      [0, -1],
      [1, -1]
    ];
  }
  getShortName() {
    return `${this.playerIndex}K_`;
  }
}
module.exports = King;
