const getXYFromPositition = position => position.split("").map(n => Number(n));

class Board {
  constructor() {
    this.pieces = [];
    this.takenPieces = [];
  }

  getPieces() {
    return this.pieces;
  }

  addPiece(piece) {
    return this.pieces.push(piece);
  }

  getPieceByPosition(position) {
    let piece = this.pieces.find(piece => {
      return position === piece.position;
    });
    return piece;
  }

  removePiece(position) {
    const piece = this.getPieceByPosition(position);
    this.pieces.splice(this.pieces.indexOf(piece), 1);
    this.takenPieces.push(piece);
    console.log("piesas capturadas",this.takenPieces);
  }

  getNewPositionFromPositionAndMovement(position, movement, direction) {
    const [x, y] = getXYFromPositition(position);
    const toPosition = `${x + movement[0]}${y + movement[1] * direction}`;
    return toPosition;
  }

  canMoveTo(fromPosition, movement, direction) {
    const [x, y] = getXYFromPositition(fromPosition);
    const toPosition = this.getNewPositionFromPositionAndMovement(fromPosition, movement, direction);
    const [x1, y1] = getXYFromPositition(toPosition);
    let can = true;
    if (can) {
      const isInside = this.isInside([x1, y1]);
      can = can && isInside;
    }

    if (can) {
      if (this.arePiecesInSameLine(fromPosition, toPosition)) {
        const shouldMoveX = x1 !== x;
        const shouldMoveY = y1 !== y;
        const spots = Math.max(Math.abs(x1 - x), Math.abs(y1 - y));
        const landingSpotPiece = this.getPieceByPosition(toPosition);
        const currentPiece = this.getPieceByPosition(fromPosition);
        for (let i = 0; i < spots; i++) {
          const tempPositionX = shouldMoveX ? (x1 > x ? x1 - i : x1 + i) : x1;
          const tempPositionY = shouldMoveY ? (y1 > y ? y1 - i : y1 + i) : y1;
          const tempPosition = `${tempPositionX}${tempPositionY}`;
          if (tempPosition !== toPosition) {
            const isEmpty = !this.getPieceByPosition(tempPosition);
            can = can && isEmpty;
          }
        }
        if (landingSpotPiece) {
          const canTakePiece =
            landingSpotPiece.getPlayerIndex() !== currentPiece.getPlayerIndex();
          can = can && canTakePiece;
        }
      } else {
        can = false;
      }
    }
    return can;
  }

  isInside(position) {
    const [x, y] = position;
    if (x <= 8 && x >= 0 && y <= 8 && y >= 0) {
      return true;
    } else {
      return false;
    }
  }

  arePiecesInSameLine(positionA, positionB) {
    const [x, y] = positionA.split("");
    const [x1, y1] = positionB.split("");
    const position1 = parseInt(x1) - parseInt(y1);
    const position2 = parseInt(x1) + parseInt(y1);
    const newPosition1 = parseInt(x) - parseInt(y);
    const newPosition2 = parseInt(x) + parseInt(y);
    if (position1 === newPosition1) {
      return true;
    }
    if (position2 === newPosition2) {
      return true;
    }
    if (x === x1) {
      return true;
    }
    if (y === y1) {
      return true;
    } else {
      return false;
    }
  }
}
module.exports = Board;
