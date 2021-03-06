const Player = require("./Player");
const King = require("../pieces/King");

const getXYFromPositition = position => position.split("").map(n => Number(n));

class Game {
  constructor(player1Name, player2Name) {
    this.board = null;
    this.turn = null;
    this.player1 = new Player(0, player1Name);
    this.player2 = new Player(1, player2Name);
    this.playerInTurn = this.player1;

    this.pieceToPromote = null;
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

  promotePiece(promote) {
    if (promote && this.pieceToPromote) {
      const piece = this.pieceToPromote;
      const newPosition = piece.getPosition();
      this.board.removePiece(newPosition);
      const PromotedClass = piece.promoteTo;
      const newPromotedPiece = new PromotedClass(
        piece.getPlayerIndex(),
        newPosition
      );
      this.board.addPiece(newPromotedPiece);
    }
    this.pieceToPromote = null;
  }

  introPiece(pieceName, position) {
    if (!this.board.getPieceByPosition(position)) {
      const pieceIntro = this.board.takenPieces.find(piece => {
        return (
          pieceName.toLowerCase() === piece.getName().toLowerCase() &&
          piece.getPlayerIndex() === this.playerInTurn.number
        );
      });
      this.board.takenPieces.splice(
        this.board.takenPieces.indexOf(pieceIntro),
        1
      );
      pieceIntro.setPosition(position);
      this.board.addPiece(pieceIntro);
      this.skipTurn();
    }
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
    if (this.isChecked(this.playerInTurn) === true) {
      console.log("Check");
      if (this.isCheckedMate(this.playerInTurn) === true) {
        console.log("CheckMate");
      }
    }

    if (pieceInNewPosition) {
      if (playerIndex === pieceInNewPosition.getPlayerIndex()) {
        return;
      } else {
        this.board.removePiece(newPosition);
      }
    }
    piece.setPosition(newPosition);
    this.pieceToPromote = null;
    if (playerIndex !== 1) {
      if (yy >= 6) {
        console.log("Do you want to promote? Enter y if you do, otherwise n");
        this.pieceToPromote = piece;
        return;
      }
    } else {
      if (yy <= 2) {
        console.log("Do you want to promote? Enter y if you do, otherwise n");
        this.pieceToPromote = piece;
      }
    }
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
    this.getBoard().getPieces();
    const row = "    0   1   2   3   4   5   6   7   8 ";
    const row1 = "  +-----------------------------------+";
    // const currentBoard = this.getBoeardPositionAsString().replace(/_/g, ' ');
    const currentBoard = this.getBoeardPositionAsString();
    const lines = currentBoard
      .split("\n")
      .map((line, index) => (line ? `${index - 1} |${line}|` : line));
    return row + "\n" + row1 + lines.join("\n") + row1;
  }

  isChecked(player) {
    const playerKing = this.board.pieces.find(it => {
      return it instanceof King && it.getPlayerIndex() === player.number;
    });
    for (let i = 0; i < this.board.pieces.length; i++) {
      const piece = this.board.pieces[i];

      if (piece.getPlayerIndex() !== player.number) {
        for (let j = 0; j < piece.movements.length; j++) {
          const movement = piece.movements[j];
          const newPosition = this.board.getNewPositionFromPositionAndMovement(
            piece.getPosition(),
            movement,
            piece.getPlayerIndex() === 0 ? 1 : -1
          );
          if (playerKing.getPosition() === newPosition) {
            return true;
          }
        }
      }
    }

    return false;
  }
  isCheckedMate(player) {
    for (let i = 0; i < this.board.pieces.length; i++) {
      const piece = this.board.pieces[i];

      if (piece.getPlayerIndex() === player.number) {
        for (let j = 0; j < piece.movements.length; j++) {
          const movement = piece.movements[j];
          this.move(piece.getPosition(), movement);

          if (!this.isChecked(player)) {
            return false;
          }
          const newPosition = this.board.getNewPositionFromPositionAndMovement(
            piece.getPosition(),
            movement,
            piece.getPlayerIndex() === 0 ? 1 : -1
          );
          this.move(newPosition, [movement * -1, movement * -1]);
        }
      }
    }

    return true;
  }
}

module.exports = Game;
