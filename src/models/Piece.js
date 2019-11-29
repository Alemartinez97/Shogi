const Board = require("./Board");

class Piece {
  constructor(playerIndex, position) {
    this.position = position;
    this.playerIndex = playerIndex;
    this.movements = [];
  }

  getShortName() {
    return "___";
  }

  getPosition() {
    // for example 48 => column 4, row 8
    return this.position;
  }

  setPosition(position) {
    this.position = position;
  }

  setPlayerIndex(playerIndex) {
    this.playerIndex = playerIndex;
  }

  getPlayerIndex() {
    return this.playerIndex;
  }

  validateMovement(movement) {
    return this.movements.find(
      m => m[0] === movement[0] && m[1] === movement[1]
    );
  }

  getAvailableMovements(board) {
    const moves = [];
    if (this.movements) {
      for (var j = 0; j < this.movements.length; j++) {
        const movement = this.movements[j];

        if (board.canMoveTo(this.position, movement, this.getPlayerIndex() === 0 ? 1 : -1)) {
          moves.push(movement);
        }
      }
    }
    return moves;
  }
}

module.exports = Piece;
