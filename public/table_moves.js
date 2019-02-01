function showTer() {
    $("#moves").show();
    $("#ressources").hide();
    terrainsTable('innondation');
};
function terrainsTable(sortField) {
    $('#terTable').empty().append('<tr><td class="colTitle klik" onclick="terrainsTable(`name`)">Terrain</td><td class="colTitle">300</td><td class="colTitle">200</td><td class="colTitle">150</td><td class="colTitle">125</td><td class="colTitle">Move</td><td class="colTitle">80</td><td class="colTitle">67</td><td class="colTitle">50</td><td class="colTitle">33</td><td class="colTitle"><span class="grisf">v</span>'+vegetAdjSp+'<span class="grisf">e</span>'+escarpAdjSp+'<span class="grisf">i</span>'+innondAdjSp+'</td><td class="colTitle">Road</td><td width="15"></td><td class="colTitle klik" onclick="terrainsTable(`escarpement`)">Escarp</td><td class="colTitle klik" onclick="terrainsTable(`vegetation`)">Veget</td><td class="colTitle klik" onclick="terrainsTable(`innondation`)">Innond</td><td class="colTitle">Cover</td><td class="colTitle">Defense</td></tr>');
    let mvClass300, mvClass200, mvClass150, mvClass125, mvClass100, mvClass80, mvClass67, mvClass50, mvClass33, mvClassSp;
    let trClass ='';
    let moveCost = 30;
    let moveCostRoad = 20;
    let vegetMoveAdj = 0;
    let innondMoveAdj = 0;
    let escarpMoveAdj = 0;
    let cover = 0;
    let defense = 0;
    let sortedTer = _.sortBy(_.sortBy(_.sortBy(_.sortBy(_.sortBy(ter,'name'),'vegetation'),'escarpement'),'innondation'),sortField);
    sortedTer.forEach(function(biome) {
        if (!biome.name.includes('non vu') && biome.name != 'rien' && biome.innondation <= 65) {
            if (trClass == '') {
                trClass = ' class="greyRow"';
            } else if (trClass == ' class="greyRow"') {
                trClass = ' class=""';
            } else {
                trClass = '';
            }
            mvClass300='', mvClass200='', mvClass150='', mvClass125='', mvClass100='', mvClass80='', mvClass67='', mvClass50='', mvClass33='', mvClassSp='';
            cover = 0;
            defense = 0;
            defense = defense+Math.round(biome.vegetation*biome.vegetation/123);
            if (biome.vegetation >= 35) {
                cover = cover+biome.vegetation+15;
            } else if (biome.vegetation >= 15) {
                cover = cover+Math.round((biome.vegetation+5)*(biome.vegetation+5)/32);
            }
            if (biome.escarpement >= 15) {
                defense = defense+Math.round((biome.escarpement-10)*5/4);
                cover = cover+Math.round(Math.sqrt(biome.escarpement-15)*5);
            }
            if (biome.innondation >= 10) {
                defense = defense+Math.round((biome.innondation-5)*4/5);
            }
            if (defense < 10) {
                defense = 10;
            }
            moveCost300 = terMC(biome,300,300,300);
            if (moveCost300 > maxMoveCost) {mvClass300 = ' rouge';}
            moveCost200 = terMC(biome,200,200,200);
            if (moveCost200 > maxMoveCost) {mvClass200 = ' rouge';}
            moveCost150 = terMC(biome,150,150,150);
            if (moveCost150 > maxMoveCost) {mvClass150 = ' rouge';}
            moveCost125 = terMC(biome,125,125,125);
            if (moveCost125 > maxMoveCost) {mvClass125 = ' rouge';}
            moveCost100 = terMC(biome,100,100,100);
            if (moveCost100 > maxMoveCost) {mvClass100 = ' rouge';}
            moveCost80 = terMC(biome,80,80,80);
            if (moveCost80 > maxMoveCost) {mvClass80 = ' rouge';}
            moveCost67 = terMC(biome,67,67,67);
            if (moveCost67 > maxMoveCost) {mvClass67 = ' rouge';}
            moveCost50 = terMC(biome,50,50,50);
            if (moveCost50 > maxMoveCost) {mvClass50 = ' rouge';}
            moveCost33 = terMC(biome,33,33,33);
            if (moveCost33 > maxMoveCost) {mvClass33 = ' rouge';}
            moveCostSp = terMC(biome,vegetAdjSp,escarpAdjSp,innondAdjSp);
            if (moveCostSp > maxMoveCost) {mvClassSp = ' rouge';}
            if (biome.road) {
                moveCostRoad = roadMC(biome,100,100,100);
            } else {
                moveCostRoad = '';
            }
            $('#terTable').append('<tr'+trClass+'><td class="name">'+biome.name+' &nbsp;</td><td class="move'+mvClass300+'">'+moveCost300+'</td><td class="move'+mvClass200+'">'+moveCost200+'</td><td class="move'+mvClass150+'">'+moveCost150+'</td><td class="move'+mvClass125+'">'+moveCost125+'</td><td class="moveBase'+mvClass100+'">'+moveCost100+'</td><td class="move'+mvClass80+'">'+moveCost80+'</td><td class="move'+mvClass67+'">'+moveCost67+'</td><td class="move'+mvClass50+'">'+moveCost50+'</td><td class="move'+mvClass33+'">'+moveCost33+'</td><td class="move'+mvClassSp+'">'+moveCostSp+'</td><td class="road">'+moveCostRoad+'</td><td><img width="'+iconSize+'" src="/static/img/wtiles/'+biome.icon+'.png" title="'+biome.icon+'"></td><td class="evi">'+biome.escarpement+'</td><td class="evi">'+biome.vegetation+'</td><td class="evi">'+biome.innondation+'</td><td class="cover">'+cover+'</td><td class="defense">'+defense+'</td></tr>');
        }
    });
};
function specialMove() {
    vegetAdjSp = prompt('Ajustement VEGETATION (défaut 100) :');
    escarpAdjSp = prompt('Ajustement ESCARPEMENT (défaut 100) :');
    innondAdjSp = prompt('Ajustement INNONDATION (défaut 100) :');
    terrainsTable('innondation');
};
function toggleIcons() {
    if (iconSize == 12) {
        iconSize = 36;
    } else if (iconSize == 36) {
        iconSize = 72;
    } else {
        iconSize = 12;
    }
    terrainsTable('innondation');
};
function terMC(biome,vegetAdj,escarpAdj,innondAdj) {
    let moveCost = 30;
    let vegetMoveAdj, escarpMoveAdj, innondMoveAdj;
    // ajustement terrain
    if (biome.adjCause != 'recifs') {
        switch (biome.adjCause) {
            case 'neige':
                moveCost = moveCost+Math.round(biome.moveCostAdj*escarpAdj/100);
                break;
            case 'sable':
                moveCost = moveCost+Math.round(biome.moveCostAdj*escarpAdj/100);
                break;
            default:
                moveCost = moveCost+biome.moveCostAdj;
        }
    }
    // vegetation
    vegetMoveAdj = calcVegetMoveAdj(biome.vegetation);
    moveCost = moveCost+Math.round(vegetMoveAdj*vegetAdj/100);
    // escarpement
    escarpMoveAdj = calcEscarpMoveAdj(biome.escarpement);
    moveCost = moveCost+Math.round(escarpMoveAdj*escarpAdj/100);
    // innondation
    innondMoveAdj = calcInnondMoveAdj(biome.innondation);
    moveCost = moveCost+Math.round(innondMoveAdj*innondAdj/100);
    // Ajustement général
    return Math.round(moveCost*baseMoveCost/30);
};
function roadMC(biome,vegetAdj,escarpAdj,innondAdj) {
    let moveCostRoad = 23;
    let vegetMoveAdj, escarpMoveAdj, innondMoveAdj;
    // ajustement terrain
    if (biome.adjCause != 'recifs') {
        switch (biome.adjCause) {
            case 'neige':
                moveCostRoad = moveCostRoad+Math.round(biome.moveCostAdj*escarpAdj*5/1000);
                break;
            case 'sable':
                moveCostRoad = moveCostRoad+Math.round(biome.moveCostAdj*escarpAdj*2/1000);
                break;
            default:
                moveCostRoad = moveCostRoad+Math.round(biome.moveCostAdj*7/10);
        }
    }
    // vegetation
    vegetMoveAdj = calcVegetMoveAdj(biome.vegetation);
    vegetMoveAdj = Math.round(vegetMoveAdj*vegetAdj/100);
    moveCostRoad = moveCostRoad+Math.round(vegetMoveAdj*20/100);
    // escarpement
    escarpMoveAdj = calcEscarpMoveAdj(biome.escarpement);
    escarpMoveAdj = Math.round(escarpMoveAdj*escarpAdj/100);
    if (escarpMoveAdj >= 10) {
        moveCostRoad = moveCostRoad+Math.round((escarpMoveAdj-10)*70/100);
    }
    // innondation
    innondMoveAdj = calcInnondMoveAdj(biome.innondation);
    innondMoveAdj = Math.round(innondMoveAdj*innondAdj/100);
    moveCostRoad = moveCostRoad+Math.round(innondMoveAdj*40/100);
    return Math.round(moveCostRoad*baseMoveCost/30);
};
