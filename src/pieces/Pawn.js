const Piece = require('../models/Piece');
class Pawn extends Piece {
  constructor(playerIndex, position) {
    super(playerIndex, position);
    this.movements = [[0, 1]];
  }

  getShortName() {
    return `${this.playerIndex}P_`;
  }
}

module.exports = Pawn;
