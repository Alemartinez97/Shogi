const Piece = require("../models/Piece");
class Lance extends Piece {
  constructor(playerIndex, position) {
    super(playerIndex, position);
    this.movements = [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
      [0, 6],
      [0, 7],
      [0, 8]
    ];
  }
  getShortName() {
    return `${this.playerIndex}L_`;
  }
}
module.exports = Lance;
