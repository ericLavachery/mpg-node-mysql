function drawUnit(unitId, tileId, icon, folder) {
    let puh = 0;
    let ouh = 0;
    let psh = 0;
    let osh = 0;
    let pbh = 0;
    let obh = 0;
    let tilePop = _.filter(pop, function(unit) {
        return (unit.tileId == tileId);
    });
    tilePop.forEach(function(unit) {
        if (unit.player != pseudo) {
            osh = osh+1;
            ouh = ouh+unit.number;
            if (unit.cat == 'bld') {
                obh = obh+1;
            }
        } else {
            psh = psh+1;
            puh = puh+unit.number;
            if (unit.cat == 'bld') {
                pbh = pbh+1;
            }
        }
    });
    showUnit(unitId, tileId, icon, folder);
    showTileBar(tileId,pbh,obh,puh,ouh,psh,osh);
};
function drawTileDefaultUnit(tileId) {
    let puh = 0;
    let ouh = 0;
    let psh = 0;
    let osh = 0;
    let pbh = 0;
    let obh = 0;
    let drawn = false;
    let tilePop = _.filter(pop, function(unit) {
        return (unit.tileId == tileId);
    });
    let sortedTilePop = _.sortBy(tilePop,'cat');
    sortedTilePop.forEach(function(unit) {
        if (unit.player != pseudo) {
            osh = osh+1;
            ouh = ouh+unit.number;
            if (unit.cat == 'bld') {
                obh = obh+1;
            }
            if (unit.cat != 'spy' && unit.cat != 'bsp') {
                if (!drawn) {
                    showUnit(unit.id, unit.tileId, unit.icon, 'icon-other');
                    drawn = true;
                }
            }
        }
    });
    drawn = false;
    sortedTilePop.forEach(function(unit) {
        if (unit.player == pseudo) {
            psh = psh+1;
            puh = puh+unit.number;
            if (unit.cat == 'bld') {
                pbh = pbh+1;
            }
            if (!drawn) {
                showUnit(unit.id, unit.tileId, unit.icon, 'icon-player');
                drawn = true;
            }
        }
    });
    showTileBar(tileId,pbh,obh,puh,ouh,psh,osh);
};
function showUnit(unitId, tileId, icon, folder) {
    $('#b'+tileId).empty().append('<img class="uicon" src="/static/img/'+folder+'/'+icon+'.png" alt="'+icon+'">');
};
function showTileBar(tileId,pbh,obh,puh,ouh,psh,osh) {
    if (puh >= 1 || ouh >=1) {
        let tbIcons = '';
        if (pbh >= 1) {
            tbIcons = tbIcons+'<i class="fas fa-university"></i> ';
        }
        if (obh >= 1) {
            tbIcons = tbIcons+'<i class="fas fa-university tbblanc"></i> ';
        }
        if (puh >= 150) {
            tbIcons = tbIcons+'<i class="far fa-life-ring"></i> ';
        } else {
            if (psh >= 2) {
                tbIcons = tbIcons+'<i class="fas fa-circle-notch"></i> ';
            }
        }
        if (ouh >= 150) {
            tbIcons = tbIcons+'<i class="far fa-life-ring tbblanc"></i> ';
        } else {
            if (osh >= 1) {
                tbIcons = tbIcons+'<i class="fas fa-circle-notch tbblanc"></i> ';
            }
        }
        $('#s'+tileId).append('<div class="tileBar" id="bar'+tileId+'">'+tbIcons+'</div>');
    }
};
