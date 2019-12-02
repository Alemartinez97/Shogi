const Piece = require('../models/Piece');
const GoldGeneral = require("./GoldGeneral");

class Pawn extends Piece {
  constructor(playerIndex, position) {
    super(playerIndex, position);

    this.promoteTo = GoldGeneral;
    this.movements = [[0, 1]];
  }
  getName() {
    return 'Pawn';
  }
  getShortName() {
    return `${this.playerIndex}P_`;
  }
}

module.exports = Pawn;
