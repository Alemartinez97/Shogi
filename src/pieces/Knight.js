const Piece = require('../models/Piece');
class Knight extends Piece {
  constructor(playerIndex,position) {
    super(playerIndex,position);
    this.movements = [
      [-1, 2],
      [1, 2]
    ];
  }
  getShortName() {
    return `${this.playerIndex}N_`;
  }
}
module.exports = Knight;
