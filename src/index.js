const { init } = require("./app");
const readline = require("readline");
const minimist = require("minimist");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const nextStep = game => {
  console.log(
    "Taken pieces",
    game.getBoard().takenPieces
      .filter(piece => piece.getPlayerIndex() === game.getPlayerInTurn().number)
      .map(piece => piece.getName())
      .join(" ")
  );
  console.log("Player in turn:", game.getPlayerInTurn().name);
  console.log(game.getBoeardPositionAsStringWithCoords());
  console.log(
    "Please enter 'row/col from' and 'row/col to' coords to move a piece, or 'Piece_name position' to reintroduce a taken piece. For example '05 06' or 'Pawn 06'"
  );
};

module.exports = () => {
  const args = minimist(process.argv.slice(2));
  const player1Name = args._[0] || "Player 1";
  const player2Name = args._[1] || "Player 2";
  const game = init(player1Name, player2Name);
  rl.on("line", function(line) {
    if (game.pieceToPromote) {
      // si estamos esperando y/n para promocionar
      if (line === "y" || line === "yes") {
        game.promotePiece(true);
        nextStep(game);
      } else if (line === "n" || line === "no") {
        game.promotePiece(false);
        nextStep(game);
      } else {
        console.log("Invalid command. Please enter y or n");
      }
    } else {
      // si no, estamos esperando comando de mover o de reintroducir

      // primero verificamos si metio 2 posiciones
      const matches = /([0-8]{2}) ([0-8]{2})/gi.exec(line || "");
      if (matches && matches.length > 2) {
        const from = matches[1];
        const to = matches[2];
        game.moveToPosition(from, to);
      } else {
        // si no, verificamos si metio nombre de pieza y posicion
        const matches = /(\w+) ([0-8]{2})/gi.exec(line || "");
        if (matches && matches.length > 2) {
          const pieceName = matches[1];
          const position = matches[2];
          game.introPiece(pieceName, position);
        } else {
          console.log(
            "Invalid command. It should include from and to coordinates in the same line, or a taken piece name and the new position to reintroduce it. For example '05 06' or 'Pawn 06'"
          );
        }
      }
      nextStep(game);
    }
  });

  nextStep(game);

  rl.on("close", function() {
    console.log("GAME ENDED !!!");
    process.exit(0);
  });
};
