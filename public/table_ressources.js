function showRess() {
    $("#moves").hide();
    $("#ressources").show();
    ressourcesTable('cat');
    resOnTerTable('name');
};
function ressourcesTable(sortField) {
    let trClass ='';
    $('#ressTable').empty().append('<tr><td class="colTitle klik" onclick="ressourcesTable(`name`)">Ressource</td><td class="colTitle klik" onclick="ressourcesTable(`price`)">Prix</td><td class="colTitle klik" onclick="ressourcesTable(`profit`)">Profit</td><td class="colTitle klik" onclick="ressourcesTable(`enk`)">Enk</td><td class="colTitle klik" onclick="ressourcesTable(`enkval`)">Prix/Enk</td><td class="colTitle">Coût</td></tr>');
    let sortedRess = _.sortBy(_.sortBy(_.sortBy(ress,'name'),'cat'),sortField);
    sortedRess.forEach(function(ressource) {
        if (trClass == '') {
            trClass = ' class="greyRow"';
        } else if (trClass == ' class="greyRow"') {
            trClass = ' class=""';
        } else {
            trClass = '';
        }
        $('#ressTable').append('<tr'+trClass+'><td class="name">'+ressource.name+' &nbsp;</td><td class="road">'+ressource.price+'</td><td class="cover">'+ressource.profit+'</td><td class="move">'+ressource.enk+'</td><td class="moveBase">'+ressource.enkval+'</td><td class="defense">'+ressource.costNum+' '+ressource.costRes+'</td></tr>');
    });
};
function resOnTerRowTitle(num) {
    $('#ressTerTable').append('<tr id="ressTitres'+num+'"><td class="colTitle klik" onclick="resOnTerTable(`name`)">Terrain</td></tr>');
    let recoltRess = _.filter(ress, function(ressource) {
        return (ressource.costRes == '');
    });
    let sortedRess = _.sortBy(_.sortBy(_.sortBy(recoltRess,'name'),'price'),'cat');
    sortedRess.forEach(function(ressource) {
        $('#ressTitres'+num).append('<td class="colTitle klik" onclick="resqLoopChange('+ressource.id+')">&nbsp;'+ressource.name+'&nbsp;</td>');
    });
};
function resOnTerTable(sortField) {
    terSortField = sortField;
    let numTitle = 1;
    $('#ressTerTable').empty();
    resOnTerRowTitle(numTitle);
    let trClass ='';
    let rowId ='bio0';
    let lastBiome = {};
    let numRes = '';
    let rowTitleCount = 0;
    let sortedTer = _.sortBy(_.sortBy(_.sortBy(_.sortBy(_.sortBy(ter,'name'),'vegetation'),'escarpement'),'innondation'),sortField);
    sortedTer.forEach(function(biome) {
        if (biome.name != 'rien') {
            if (trClass == '') {
                trClass = ' class="greyRow"';
            } else if (trClass == ' class="greyRow"') {
                trClass = ' class=""';
            } else {
                trClass = '';
            }
            $('#ressTerTable').append('<tr'+trClass+' id="bio'+biome.id+'"><td class="name tooltip klik">'+biome.name+' &nbsp;<span><img src="/static/img/wtiles/'+biome.icon+'.png"></span></td></tr>');
            lastBiome = biome;
            rowId ='#bio'+biome.id;
            let recoltRess = _.filter(ress, function(ressource) {
                return (ressource.costRes == '');
            });
            let sortedRess = _.sortBy(_.sortBy(_.sortBy(recoltRess,'name'),'price'),'cat');
            sortedRess.forEach(function(ressource) {
                numRes = calcNumRes(ressource,lastBiome);
                if (numRes == 0) {numRes = '';}
                $(rowId).append('<td class="cover klik" onclick="resqChange('+ressource.id+','+lastBiome.id+')">&nbsp;'+numRes+'&nbsp;</td>');
            });
            rowTitleCount = rowTitleCount+1;
            if (rowTitleCount == 31) {
                rowTitleCount = 1;
                numTitle = numTitle+1;
                resOnTerRowTitle(numTitle);
            }
        }
    });
};
function resqChange(ressId,terId) {
    let ressIndex = ress.findIndex((obj => obj.id == ressId));
    let ressource = ress[ressIndex];
    let terIndex = ter.findIndex((obj => obj.id == terId));
    let biome = ter[terIndex];
    resqSave(ressource,biome);
    resOnTerTable(terSortField);
};
function resqLoopChange(ressId) {
    let ressIndex = ress.findIndex((obj => obj.id == ressId));
    let ressource = ress[ressIndex];
    let pdval = '';
    let resq = '';
    let terIndex = 0;
    let sortedTer = _.sortBy(_.sortBy(_.sortBy(_.sortBy(_.sortBy(ter,'name'),'vegetation'),'escarpement'),'innondation'),'name');
    sortedTer.forEach(function(biome) {
        if (biome.name != 'rien') {
            resqSave(ressource,biome);
        }
    });
    resOnTerTable(terSortField);
};
function resqSave(ressource,biome) {
    terIndex = ter.findIndex((obj => obj.id == biome.id));
    let pdval = resqFind(ressource,biome);
    let resq = prompt(ressource.name+' : '+biome.name, pdval);
    ter[terIndex].resq1 = ter[terIndex].resq1.replace(ressource.name+'_','');
    ter[terIndex].resq2 = ter[terIndex].resq2.replace(ressource.name+'_','');
    ter[terIndex].resq3 = ter[terIndex].resq3.replace(ressource.name+'_','');
    ter[terIndex].resq4 = ter[terIndex].resq4.replace(ressource.name+'_','');
    ter[terIndex].resq5 = ter[terIndex].resq5.replace(ressource.name+'_','');
    switch (resq) {
        case '1':
            ter[terIndex].resq1 = ter[terIndex].resq1+ressource.name+'_';
            break;
        case '2':
            ter[terIndex].resq2 = ter[terIndex].resq2+ressource.name+'_';
            break;
        case '3':
            ter[terIndex].resq3 = ter[terIndex].resq3+ressource.name+'_';
            break;
        case '4':
            ter[terIndex].resq4 = ter[terIndex].resq4+ressource.name+'_';
            break;
        case '5':
            ter[terIndex].resq5 = ter[terIndex].resq5+ressource.name+'_';
            break;
    }
    if (resq != pdval) {
        emitSingleTerChange(biome.id,'resq1',ter[terIndex].resq1);
        emitSingleTerChange(biome.id,'resq2',ter[terIndex].resq2);
        emitSingleTerChange(biome.id,'resq3',ter[terIndex].resq3);
        emitSingleTerChange(biome.id,'resq4',ter[terIndex].resq4);
        emitSingleTerChange(biome.id,'resq5',ter[terIndex].resq5);
    }
};
function resqFind(ressource,biome) {
    let resq = 0;
    if (biome.resq5.includes(ressource.name+'_')) {
        resq = 5;
    } else if (biome.resq4.includes(ressource.name+'_')) {
        resq = 4;
    } else if (biome.resq3.includes(ressource.name+'_')) {
        resq = 3;
    } else if (biome.resq2.includes(ressource.name+'_')) {
        resq = 2;
    } else if (biome.resq1.includes(ressource.name+'_')) {
        resq = 1;
    }
    return resq;
};
function calcNumRes(ressource,biome) {
    let numRes = 0;
    if (biome.resq5.includes(ressource.name+'_')) {
        numRes = Math.round(18*ressource.quant)/10;
    } else if (biome.resq4.includes(ressource.name+'_')) {
        numRes = Math.round(12*ressource.quant)/10;
    } else if (biome.resq3.includes(ressource.name+'_')) {
        numRes = Math.round(7*ressource.quant)/10;
    } else if (biome.resq2.includes(ressource.name+'_')) {
        numRes = Math.round(3*ressource.quant)/10;
    } else if (biome.resq1.includes(ressource.name+'_')) {
        numRes = Math.round(1*ressource.quant)/10;
    } else {
        numRes = 0;
    }
    return numRes;
};
