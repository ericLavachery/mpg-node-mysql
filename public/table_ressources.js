function showRess() {
    $("#moves").hide();
    $("#ressources").show();
    ressourcesTable('name');
    resOnTerTable('name');
};
function ressourcesTable(sortField) {
    let trClass ='';
    $('#ressTable').empty().append('<tr><td class="colTitle klik" onclick="ressourcesTable(`name`)">Ressource</td><td class="colTitle klik" onclick="ressourcesTable(`price`)">Prix</td><td class="colTitle klik" onclick="ressourcesTable(`profit`)">Profit</td><td class="colTitle klik" onclick="ressourcesTable(`enk`)">Enk</td><td class="colTitle klik" onclick="ressourcesTable(`enkval`)">Prix/Enk</td><td class="colTitle">Coût</td></tr>');
    let sortedRess = _.sortBy(_.sortBy(ress,'name'),sortField);
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
function resOnTerTable(sortField) {
    $('#ressTerTable').empty().append('<tr id="ressTitres"><td class="colTitle klik" onclick="resOnTerTable(`name`)">Terrain</td></tr>');
    let recoltRess = _.filter(ress, function(ressource) {
        return (ressource.costRes == '');
    });
    let sortedRess = _.sortBy(_.sortBy(recoltRess,'name'),'price');
    sortedRess.forEach(function(ressource) {
        $('#ressTitres').append('<td class="colTitle klik" onclick="resqChange('+ressource.id+')">&nbsp;'+ressource.name+'&nbsp;</td>');
    });
    let trClass ='';
    let rowId ='bio0';
    let lastBiome = {};
    let numRes = '';
    let sortedTer = _.sortBy(_.sortBy(_.sortBy(_.sortBy(_.sortBy(ter,'name'),'vegetation'),'escarpement'),'innondation'),sortField);
    sortedTer.forEach(function(biome) {
        if (!biome.name.includes('non vu') && biome.name != 'rien') {
            if (trClass == '') {
                trClass = ' class="greyRow"';
            } else if (trClass == ' class="greyRow"') {
                trClass = ' class=""';
            } else {
                trClass = '';
            }
            $('#ressTerTable').append('<tr'+trClass+' id="bio'+biome.id+'"><td class="name">'+biome.name+' &nbsp;</td></tr>');
            lastBiome = biome;
            rowId ='#bio'+biome.id;
            sortedRess.forEach(function(ressource) {
                numRes = calcNumRes(ressource,lastBiome);
                if (numRes == 0) {numRes = '';}
                $(rowId).append('<td class="cover">&nbsp;'+numRes+'&nbsp;</td>');
            });
        }
    });
};
function resqChange(ressId) {
    let ressIndex = ress.findIndex((obj => obj.id == ressId));
    let ressource = ress[ressIndex];
    let pdval = '';
    let resq = '';
    let sortedTer = _.sortBy(_.sortBy(_.sortBy(_.sortBy(_.sortBy(ter,'name'),'vegetation'),'escarpement'),'innondation'),'name');
    sortedTer.forEach(function(biome) {
        if (biome.name != 'rien') {
            pdval = resqFind(ressource,biome);
            resq = prompt(ressource.name+' : '+biome.name, pdval);
        }
    });
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
