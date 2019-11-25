const init = require("./app");
const readline = require("readline");
const minimist = require("minimist");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const nextStep = game => {
  console.log("Player in turn:", game.getPlayerInTurn().name);
  console.log(game.getBoeardPositionAsStringWithCoords());
  console.log("Please enter from and to coords");
};

module.exports = () => {
  const args = minimist(process.argv.slice(2));
  const player1Name = args._[0] || "Player 1";
  const player2Name = args._[1] || "Player 2";
  const game = init(player1Name, player2Name);
  
  rl.on("line", function(line) {
    const matches = /([0-8]{2}) ([0-8]{2})/gi.exec(line || "");
    if (matches && matches.length > 2) {
      const from = matches[1];
      const to = matches[2];
      game.moveToPosition(from, to);
    } else {
      console.log(
        "Invalid command. It should include from and to coordinates in the same line. For example '05 06'"
      );
    }
    nextStep(game);
  });

  nextStep(game);

  rl.on("close", function() {
    console.log("\nBYE BYE !!!");
    process.exit(0);
  });
};
