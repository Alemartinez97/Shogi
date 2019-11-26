const Piece = require('../models/Piece');
const GoldGeneral = require("../pieces/GoldGeneral");

class Knight extends Piece {
  constructor(playerIndex,position) {
    super(playerIndex,position);

    this.promoteTo = GoldGeneral;
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
