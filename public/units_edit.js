function showTileUnitList(tileId) {
    $('#tileUnitList').empty();
    let numSameType = 1;
    pop.forEach(function(unit) {
        if (unit.tileId == tileId) {
            if (selectedUnit.id == unit.id) {
                $('#tileUnitList').append('<span class="paramName">'+unit.number+' '+unit.type+'</span><span class="paramValue">'+unit.player+'&nbsp;<span class="mauve"><b>&laquo;</b></span></span><br>');
            } else {
                if (unit.type == selectedUnit.type) {
                    numSameType = numSameType+1;
                }
                $('#tileUnitList').append('<a href="#" id="tileUnitListId'+unit.id+'" onclick="selectUnitFromTileInfoList(this)"><span class="paramName">'+unit.number+' '+unit.type+'</span><span class="paramValue">'+unit.player+'</span></a><br>');
            }
        }
    });
    if (numSameType >= 2) {
        $('#tileUnitList').append('<br><button type="button" name="join" id="joinButton">Join all '+selectedUnit.type+' units</button>');
    }
    if (selectedUnit.number >= 2) {
        splitButtons(selectedUnit.id);
    }
};
function splitButtons(unitId) {
    let unitIndex = pop.findIndex((obj => obj.id == unitId));
    let unitNumber = pop[unitIndex].number;
    let splitA = 1;
    let splitB = unitNumber-splitA;
    $('#tileUnitList').append('<br><button type="button" name="split1" id="split1Button">'+splitA+':'+splitB+'</button>');
    if (unitNumber >= 4) {
        splitA = 2;
        splitB = unitNumber-splitA;
        $('#tileUnitList').append('<button type="button" name="split2" id="split2Button">'+splitA+':'+splitB+'</button>');
    }
    if (unitNumber >= 6) {
        splitA = 3;
        splitB = unitNumber-splitA;
        $('#tileUnitList').append('<button type="button" name="split3" id="split3Button">'+splitA+':'+splitB+'</button>');
    }
    if (unitNumber >= 80) { // 5%
        splitA = Math.round(unitNumber/20);
        splitB = unitNumber-splitA;
        $('#tileUnitList').append('<button type="button" name="split5" id="split5Button">'+splitA+':'+splitB+'</button>');
    }
    if (unitNumber >= 40) { // 10%
        splitA = Math.round(unitNumber/10);
        splitB = unitNumber-splitA;
        $('#tileUnitList').append('<button type="button" name="split10" id="split10Button">'+splitA+':'+splitB+'</button>');
    }
    if (unitNumber >= 27) { // 15%
        splitA = Math.round(unitNumber*15/100);
        splitB = unitNumber-splitA;
        $('#tileUnitList').append('<button type="button" name="split15" id="split15Button">'+splitA+':'+splitB+'</button>');
    }
    if (unitNumber >= 20) { // 20%
        splitA = Math.round(unitNumber/5);
        splitB = unitNumber-splitA;
        $('#tileUnitList').append('<button type="button" name="split20" id="split20Button">'+splitA+':'+splitB+'</button>');
    }
    if (unitNumber >= 16) { // 25%
        splitA = Math.round(unitNumber/4);
        splitB = unitNumber-splitA;
        $('#tileUnitList').append('<button type="button" name="split25" id="split25Button">'+splitA+':'+splitB+'</button>');
    }
    if (unitNumber >= 12) { // 33%
        splitA = Math.round(unitNumber/3);
        splitB = unitNumber-splitA;
        $('#tileUnitList').append('<button type="button" name="split33" id="split33Button">'+splitA+':'+splitB+'</button>');
    }
    if (unitNumber >= 8) { // 50%
        splitA = Math.round(unitNumber/2);
        if (splitA*2 > unitNumber) {splitA = splitA-1;};
        splitB = unitNumber-splitA;
        $('#tileUnitList').append('<button type="button" name="split50" id="split50Button">'+splitA+':'+splitB+'</button>');
    }
}
