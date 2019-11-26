const King = require("./pieces/King");
const SilverGeneral = require("./pieces/SilverGeneral");
const GoldGeneral = require("./pieces/GoldGeneral");
const Bishop = require("./pieces/Bishop");
const Knight = require("./pieces/Knight");
const Lance = require("./pieces/Lance");
const Pawn = require("./pieces/Pawn");
const Rook = require("./pieces/Rook");

const INITIAL_PIECES = [
  { player: 0, model: Lance, position: "00" },
  { player: 0, model: Knight, position: "10" },
  { player: 0, model: SilverGeneral, position: "20" },
  { player: 0, model: GoldGeneral, position: "30" },
  { player: 0, model: King, position: "40" },
  { player: 0, model: GoldGeneral, position: "50" },
  { player: 0, model: SilverGeneral, position: "60" },
  { player: 0, model: Knight, position: "70" },
  { player: 0, model: Lance, position: "80" },
  { player: 0, model: Rook, position: "11" },
  { player: 0, model: Bishop, position: "71" },
  { player: 0, model: Pawn, position: "02" },
  { player: 0, model: Pawn, position: "12" },
  { player: 0, model: Pawn, position: "22" },
  { player: 0, model: Pawn, position: "32" },
  { player: 0, model: Pawn, position: "42" },
  { player: 0, model: Pawn, position: "52" },
  { player: 0, model: Pawn, position: "62" },
  { player: 0, model: Pawn, position: "72" },
  { player: 0, model: Pawn, position: "82" },
  { player: 1, model: Pawn, position: "06" },
  { player: 1, model: Pawn, position: "16" },
  { player: 1, model: Pawn, position: "26" },
  { player: 1, model: Pawn, position: "36" },
  { player: 1, model: Pawn, position: "46" },
  { player: 1, model: Pawn, position: "56" },
  { player: 1, model: Pawn, position: "66" },
  { player: 1, model: Pawn, position: "76" },
  { player: 1, model: Pawn, position: "86" },
  { player: 1, model: Bishop, position: "17" },
  { player: 1, model: Rook, position: "77" },
  { player: 1, model: Lance, position: "08" },
  { player: 1, model: Knight, position: "18" },
  { player: 1, model: SilverGeneral, position: "28" },
  { player: 1, model: GoldGeneral, position: "38" },
  { player: 1, model: King, position: "48" },
  { player: 1, model: GoldGeneral, position: "58" },
  { player: 1, model: SilverGeneral, position: "68" },
  { player: 1, model: Knight, position: "78" },
  { player: 1, model: Lance, position: "88" }
];

module.exports = INITIAL_PIECES;
