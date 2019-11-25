const Piece = require('../models/Piece');
class GoldGeneral extends Piece {
  constructor(playerIndex,position) {
    super(playerIndex,position);
    this.movements = [
      [-1, 1],
      [0, 1],
      [1, 1],
      [-1, 0],
      [1, 0],
      [0, -1]
    ];
  }
  getShortName() {
    return `${this.playerIndex}G_`;
  }
}
module.exports = GoldGeneral;