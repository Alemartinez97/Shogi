const Player = require("./Player");

const getXYFromPositition = position => position.split("").map(n => Number(n));

class Game {
  constructor(player1Name, player2Name) {
    this.board = null;
    this.turn = null;
    this.player1 = new Player(0, player1Name);
    this.player2 = new Player(1, player2Name);
    this.playerInTurn = this.player1;
  }

  getPlayers() {
    return [this.player1, this.player2];
  }

  getPlayerInTurn() {
    return this.playerInTurn;
  }

  getBoard() {
    return this.board;
  }

  setBoard(board) {
    this.board = board;
  }

  moveToPosition(fromPosition, toPosition) {
    const [x, y] = getXYFromPositition(fromPosition);
    const [x1, y1] = getXYFromPositition(toPosition);
    const movement = [x1 - x, y1 - y];
    return this.move(fromPosition, movement);
  }

  move(position, movement) {
    //TODO: Hacer validacion
    const playerIndex = this.playerInTurn.number;
    const piece = this.board.getPieceByPosition(position);
    if (!piece) {
      return;
    }
    const pieceOwnerPlayerIndex = piece.getPlayerIndex();
    if (playerIndex !== pieceOwnerPlayerIndex) {
      return;
    }
    const [movementX, movementY] = movement;
    const playerY = parseInt(movementY) * (playerIndex === 1 ? -1 : 1);
    const newMovement = [movementX, playerY];
    const isValid = piece.validateMovement(newMovement);
    if (!isValid) {
      return;
    }
    const [x, y] = position.split("");
    const [x1, y1] = movement;
    const xx = parseInt(x) + x1;
    const yy = parseInt(y) + y1;
    const newPosition = `${xx}${yy}`;
    const pieceInNewPosition = this.board.getPieceByPosition(newPosition);
    if (pieceInNewPosition) {
      if (playerIndex === pieceInNewPosition.getPlayerIndex()) {
        return;
      } else {
        this.board.removePiece(newPosition);
      }
    }
    piece.setPosition(newPosition);
    this.skipTurn();
  }

  skipTurn() {
    if (this.playerInTurn === this.player2) {
      this.playerInTurn = this.player1;
    } else {
      this.playerInTurn = this.player2;
    }
  }

  getBoeardPositionAsString() {
    const pieces = this.getBoard().getPieces();
    const currentPosition = new Array(9)
      .fill()
      .map(row => new Array(9).fill().map(col => "___"));
    pieces.forEach(p => {
      const piecePosition = p.getPosition();
      const [x, y] = piecePosition.split("");
      currentPosition[y][x] = p.getShortName();
    });
    const positionAsString = currentPosition
      .map(row => row.join(" "))
      .join("\n");
    return `\n${positionAsString}\n`;
  }

  getBoeardPositionAsStringWithCoords() {
    const pieces = this.getBoard().getPieces();
    const row = "    0   1   2   3   4   5   6   7   8 ";
    const row1 = "  +-----------------------------------+";
    // const currentBoard = this.getBoeardPositionAsString().replace(/_/g, ' ');
    const currentBoard = this.getBoeardPositionAsString();
    const lines = currentBoard
      .split("\n")
      .map((line, index) => (line ? `${index - 1} |${line}|` : line));
    return row + "\n" + row1 + lines.join("\n") + row1;
  }
}

module.exports = Game;
