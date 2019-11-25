const Piece = require('../models/Piece');
class SilverGeneral extends Piece {
  constructor(playerIndex, position) {
  super(playerIndex,position);
    this.moves = [
      [-1, 1],
      [0, 1],
      [1, 1],
      [-1, -1],
      [1, -1]
    ];
  }
  getShortName() {
    return `${this.playerIndex}S_`;
  }
}
module.exports = SilverGeneral;
