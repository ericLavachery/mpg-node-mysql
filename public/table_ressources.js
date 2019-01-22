function showRess() {
    $("#moves").hide();
    $("#ressources").show();
    ressourcesTable('name');
    resOnTerTable('name');
};
function ressourcesTable(sortField) {
    let trClass ='';
    $('#ressTable').empty().append('<tr><td class="colTitle klik" onclick="ressourcesTable(`name`)">Ressource</td><td class="colTitle klik" onclick="ressourcesTable(`price`)">Prix</td><td class="colTitle klik" onclick="ressourcesTable(`profit`)">Profit</td><td class="colTitle klik" onclick="ressourcesTable(`enk`)">Enk</td><td class="colTitle klik" onclick="ressourcesTable(`enkval`)">Prix/Enk</td><td class="colTitle">Coût</td><td class="colTitle klik" title="Récoltes" onclick="ressourcesTable(`quant`)">Rec</td><td class="colTitle klik" onclick="ressourcesTable(`cat`)">Cat</td></tr>');
    let sortedRess = _.sortBy(_.sortBy(_.sortBy(ress,'name'),'cat'),sortField);
    sortedRess.forEach(function(ressource) {
        if (trClass == '') {
            trClass = ' class="greyRow"';
        } else if (trClass == ' class="greyRow"') {
            trClass = ' class=""';
        } else {
            trClass = '';
        }
        $('#ressTable').append('<tr'+trClass+'><td class="name klik" onclick="ressChange('+ressource.id+',`name`)">'+ressource.name+' &nbsp;</td><td class="road klik" onclick="ressChange('+ressource.id+',`price`)">'+ressource.price+'</td><td class="cover">'+ressource.profit+'</td><td class="move klik" onclick="ressChange('+ressource.id+',`enk`)">'+ressource.enk+'</td><td class="moveBase">'+ressource.enkval+'</td><td class="defense klik" onclick="ressChange('+ressource.id+',`costNum`)">'+ressource.costNum+' '+ressource.costRes+'</td><td class="moveBase klik" onclick="ressChange('+ressource.id+',`quant`)">'+ressource.quant+'</td><td class="name klik" onclick="catModChange('+ressource.id+',`cat`)">'+ressource.cat+'</td></tr>');
    });
};
function resOnTerRowTitle(num) {
    $('#ressTerTable').append('<tr id="ressTitres'+num+'"><td class="colTitle klik" onclick="resOnTerTable(`name`)">Terrain</td></tr>');
    let recoltRess = _.filter(ress, function(ressource) {
        return (ressource.costRes == '');
    });
    let sortedRess = _.sortBy(_.sortBy(_.sortBy(recoltRess,'name'),'price'),'cat');
    sortedRess.forEach(function(ressource) {
        $('#ressTitres'+num).append('<td class="colTitle klik">&nbsp;'+ressource.name+'&nbsp;</td>');
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
function addRes() {
    let name = prompt('NOM de la ressource :','caca');
    let price = prompt('PRIX :',1);
    let enk = prompt('ENK :',10);
    let quant = prompt('QUANTITE récoltée :',0);
    let costRes = prompt('Coût (RESSOURCE) :','');
    let costNum = prompt('Coût (QUANTITE) :',1);
    let cat = prompt('CAT (plante/animal/roche/minerai/nourriture) :','');
    if (name != null) {
        let newRes = {};
        newRes.name = name;
        newRes.price = Number(price);
        newRes.enk = Number(enk);
        newRes.costRes = costRes;
        newRes.costNum = Number(costNum);
        newRes.quant = Number(quant);
        newRes.cat = cat;
        newRes.altRes = '';
        socket.emit('add_res', newRes);
    }
};
function ressChange(ressId,field) {
    let ressIndex = ress.findIndex((obj => obj.id == ressId));
    let ressource = ress[ressIndex];
    // costNum : changer aussi costRes
    if (field == 'costNum') {
        let newResValue = prompt('costRes : ',ress[ressIndex].costRes);
        ress[ressIndex].costRes = newResValue;
        emitSingleChange(ressId,'ressources','costRes',newResValue);
    }
    let newValue;
    if (field == 'name') {
        newValue = prompt(field+' : ',ress[ressIndex][field]);
    } else {
        newValue = Number(prompt(field+' : ',ress[ressIndex][field]));
    }
    ress[ressIndex][field] = newValue;
    // changer les champs calculés
    if (field == 'price' || field == 'enk') {
        ressource.enkval = Math.round(10*ressource.price/ressource.enk);
    }
    if (field == 'price' || field == 'costNum') {
        let resCostIndex = 0;
        let resCost = 0;
        if (ressource.costRes != '') {
            resCostIndex = ress.findIndex((obj => obj.name == ressource.costRes));
            if (ressource.costNum == 0) {
                resCost = Math.round(ress[resCostIndex].price/10);
            } else {
                resCost = ressource.costNum*ress[resCostIndex].price;
            }
            ressource.profit = ressource.price-resCost;
        } else {
            ressource.profit = ressource.price;
        }
    }
    emitSingleChange(ressId,'ressources',field,newValue);
    ressourcesTable('name');
};
function catModChange(ressId,field) {
    let ressIndex = ress.findIndex((obj => obj.id == ressId));
    let ressource = ress[ressIndex];
    let sel = '';
    $('#modalHead').empty().append(ressource.name+' : catégorie');
    $('#modalFoot').empty();
    $('#modalBody').empty().append('<select class="modeButtons" name="'+ressId+'" id="resCatChange" onchange="catModOut(this);"><option value="" selected>&nbsp;</option></select>');
    if (ressource.cat == 'animal') {sel = ' selected';} else {sel = '';}
    $('#resCatChange').append('<option value="animal"'+sel+'>&nbsp;animal</option>');
    if (ressource.cat == 'plante') {sel = ' selected';} else {sel = '';}
    $('#resCatChange').append('<option value="plante"'+sel+'>&nbsp;plante</option>');
    if (ressource.cat == 'roche') {sel = ' selected';} else {sel = '';}
    $('#resCatChange').append('<option value="roche"'+sel+'>&nbsp;roche</option>');
    if (ressource.cat == 'minerai') {sel = ' selected';} else {sel = '';}
    $('#resCatChange').append('<option value="minerai"'+sel+'>&nbsp;minerai</option>');
    // if (ressource.cat == 'nourriture') {sel = ' selected';} else {sel = '';}
    // $('#resCatChange').append('<option value="nourriture"'+sel+'>&nbsp;nourriture</option>');
    modal.style.display = "block";
};
function catModOut(select) {
    let ressId = Number(select.name);
    let ressIndex = ress.findIndex((obj => obj.id == ressId));
    let newValue = select.value;
    ress[ressIndex].cat = newValue;
    emitSingleChange(ressId,'ressources','cat',newValue);
    modal.style.display = "none";
    ressourcesTable('name');
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
