const Game = require("./models/Game");
const INITIAL_PIECES = require("./constants");
const Board = require("./models/Board");

function init(player1Name, player2Name) {
  const game = new Game(player1Name, player2Name);
  const board = new Board();
  game.setBoard(board);
  INITIAL_PIECES.forEach(p => {
    const Model = p.model;
    board.addPiece(new Model(p.player, p.position));
  });
  return game;
}

module.exports = init;
