let ter = [];
let maxMoveCost = 240; // 180 default
let baseMoveCost = 40; // 30 default (moveCost is x baseMoveCost /30)
let vegetAdjSp = 20;
let escarpAdjSp = 20;
let innondAdjSp = 20;
let iconSize = 12;
let terSortField = 'name';
$("#moves").hide();
$("#ressources").hide();
socket.on('terload', function(wter) {
    ter = wter;
});
socket.on('ressload', function(ressources) {
    ress = ressources;
    showRess();
});
