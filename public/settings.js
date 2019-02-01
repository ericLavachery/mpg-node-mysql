let numHTiles = 15; // default 15
let numVTiles = 9; // default 9
let xOffsetForced = 0;
let xOffset = Number(new URLSearchParams(document.location.search).get("x"));
if (xOffset == null) {
    xOffset = 0;
} else {
    xOffsetForced = xOffset;
}
let yOffsetForced = 0;
let yOffset = Number(new URLSearchParams(document.location.search).get("y"));
if (yOffset == null) {
    yOffset = 0;
} else {
    yOffsetForced = yOffset;
}
let pop = [];
let world = [];
let ter = [];
let ress = [];
let towns = [];
let unhiddenTiles = [];
let perso = {};
let mygroups = [];
let myTracks = [];
let trackedTiles = '';
let selectedUnit = [];
let selectedTrack = [];
let selectedTile = [];
let selTer = [];
let selAddon = 'point';
let selCity = '';
let mapEditTemp = -1;
let mode = 'inspect';
let uvp = ''; // unit view priority
let showTracks = false;
let expSquadDetail = false;
let expTileDetail = false;
let exploMLfactor = 1.5; // explo move loss = moveCost*exploMLfactor
let cartoMLfactor = 1;
let minCartoML = 60; // perte de move min (x3 si sans hab spéciale)
let maxMoveCost = 240; // 180 default
let baseMoveCost = 40; // moveCost is x baseMoveCost /30
let viewOutPerc = 0; // % qu'un tile soit perdu de vue en passant au jour suivant (defaut 5 / dev 0)
let biomeCoverFac = 65; // terCover x biomeCoverFac / 100
let biomeDefFac = 100; // terDefense x biomeDefFac / 100
