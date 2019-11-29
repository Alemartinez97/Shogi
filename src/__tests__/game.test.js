const Game = require("../models/Game");
const init = require("../app.js");
const {
  INITIAL,
  FIRST_PAWN_MOVED,
  GG_MOVED_UNTIL_REACH_PAWN,
  PAWN_MOVED_UNTIL_TAKE,
  PAWN_PROMOTED,
  PAWN_NOT_PROMOTED,
} = require("../board-position.js");

describe("Game init", () => {
  it("Board can be initialized", () => {
    const game = init();
    expect(game instanceof Game).toBe(true);
  });

  it("Board pieces are initially placed", () => {
    const game = init();
    const pieces = game.getBoard().getPieces();
    expect(pieces).toHaveLength(40);
    expect(game.getBoeardPositionAsString()).toEqual(INITIAL);
  });

  it("Board pieces after initial pawn move", () => {
    const game = init();
    const pieces = game.getBoard().getPieces();
    expect(pieces).toHaveLength(40);
    game.move("52", [0, 1]);
    game.move("36", [0, -1]);
    expect(game.getBoeardPositionAsString()).toEqual(FIRST_PAWN_MOVED);
  });

  it("Player cannot move pieces of another player", () => {
    const game = init();
    const pieces = game.getBoard().getPieces();
    expect(pieces).toHaveLength(40);
    game.move("52", [0, 1]);
    game.skipTurn();
    game.move("36", [0, -1]);
    expect(game.getBoeardPositionAsString()).not.toEqual(FIRST_PAWN_MOVED);
  });

  it("Player can take another piece", () => {
    const game = init();
    const pieces = game.getBoard().getPieces();
    expect(pieces).toHaveLength(40);
    game.move("52", [0, 1]);
    game.skipTurn();
    game.move("53", [0, 1]);
    game.skipTurn();
    game.move("54", [0, 1]);
    game.skipTurn();
    game.move("55", [0, 1]); // take
    expect(game.getBoeardPositionAsString()).toEqual(PAWN_MOVED_UNTIL_TAKE);
  });

  it("Player cannot move to non empty spot", () => {
    const game = init();
    const pieces = game.getBoard().getPieces();
    expect(pieces).toHaveLength(40);
    game.move("50", [0, 1]);
    game.skipTurn();
    game.move("51", [0, 1]);
    expect(game.getBoeardPositionAsString()).toEqual(GG_MOVED_UNTIL_REACH_PAWN);
  });

  it("Piece can return available movements", () => {
    const game = init();
    game.move("62", [0, 1]);
    const bishop = game.getBoard().getPieceByPosition("71");
    expect(bishop.getAvailableMovements(game.getBoard())).toEqual([
      [-1, 1],
      [-2, 2],
      [-3, 3],
      [-4, 4],
      [-5, 5]
    ]);
    const rook = game.getBoard().getPieceByPosition("11");
    expect(rook.getAvailableMovements(game.getBoard())).toEqual([
      [-1, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0]
    ]);
  });

  it("Check player 2", () => {
    const game = init();
    game.move("42", [0, 1]);
    game.skipTurn();
    game.move("43", [0, 1]);
    game.skipTurn();
    game.move("44", [0, 1]);
    game.skipTurn();
    game.move("45", [0, 1]);
    game.move("46", [0, 1]);
    expect(game.isChecked(game.player2)).toBe(true);
  });

  it("Check player 1", () => {
    const game = init();
    game.skipTurn();
    game.move("46", [0, -1]);
    game.skipTurn();
    game.move("45", [0, -1]);
    game.skipTurn();
    game.move("44", [0, -1]);
    game.skipTurn();
    game.move("43", [0, -1]);
    game.skipTurn();
    game.move("42", [0, -1]);
    expect(game.isChecked(game.player1)).toBe(true);
  });

  // it("Check Mate player 1", () => {
  //   const game = init();
  //   expect(game.isCheckedMate(game.player1)).toEqual();
  // });

  // it("Check Mate player 2", () => {
  //   const game = init();
  //   expect(game.isCheckedMate(game.player2)).toEqual();
  // });

  it("Invalid movement", () => {
    const game = init();
    expect(game.getBoard().isInside([10, 10])).toEqual(false);
    expect(game.getBoard().isInside([3, 3])).toEqual(true);
    expect(game.getBoard().isInside([0, 9])).toEqual(false);
    expect(game.getBoard().isInside([7, 7])).toEqual(true);
    expect(game.getBoard().isInside([-2, 5])).toEqual(false);
    expect(game.getBoard().isInside([-3, -4])).toEqual(false);
    expect(game.getBoard().isInside([0, 0])).toEqual(true);
  });

  it("Two points that are aligned can be identified", () => {
    const game = init();
    expect(game.getBoard().arePiecesInSameLine("04", "15")).toEqual(true);
    expect(game.getBoard().arePiecesInSameLine("04", "26")).toEqual(true);
    expect(game.getBoard().arePiecesInSameLine("04", "37")).toEqual(true);
    expect(game.getBoard().arePiecesInSameLine("04", "27")).toEqual(false);
    expect(game.getBoard().arePiecesInSameLine("04", "10")).toEqual(false);
  });

  it("Two points that are aligned can be identified", () => {
    const game = init();
    expect(game.getBoard().arePiecesInSameLine("15", "06")).toEqual(true);
    expect(game.getBoard().arePiecesInSameLine("15", "24")).toEqual(true);
    expect(game.getBoard().arePiecesInSameLine("15", "33")).toEqual(true);
    expect(game.getBoard().arePiecesInSameLine("15", "34")).toEqual(false);
  });

  it("Two points that are aligned can be identified", () => {
    const game = init();
    expect(game.getBoard().arePiecesInSameLine("15", "11")).toEqual(true);
    expect(game.getBoard().arePiecesInSameLine("44", "84")).toEqual(true);
    expect(game.getBoard().arePiecesInSameLine("34", "11")).toEqual(false);
  });

  it("Piece promoted", () => {
    const game = init();
    game.skipTurn();
    game.move("06", [0, -1]);
    game.skipTurn();
    game.move("05", [0, -1]);
    game.skipTurn();
    game.move("04", [0, -1]);
    game.skipTurn();
    game.move("03", [0, -1]);
    game.promotePiece(true);
    expect(game.getBoeardPositionAsString()).toEqual(PAWN_PROMOTED);
  });

  it("Piece not promoted", () => {
    const game = init();
    game.skipTurn();
    game.move("06", [0, -1]);
    game.skipTurn();
    game.move("05", [0, -1]);
    game.skipTurn();
    game.move("04", [0, -1]);
    game.skipTurn();
    game.move("03", [0, -1]);
    game.promotePiece(false);
    expect(game.getBoeardPositionAsString()).toEqual(PAWN_NOT_PROMOTED);
  });
});
