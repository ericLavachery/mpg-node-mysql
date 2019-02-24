function unitsCRUD() {
    $('#unitsTable').empty();
    $('#unitsTable').append('<tr id="uTableFieldsDel"></tr>');
    Object.keys(unitTypes[0]).forEach(function(key,index) {
        if (!fieldsOut.includes(key)) {
            $('#uTableFieldsDel').append('<td class="colDel klik" title="retirer '+key+' du tableau" onclick="removeField(`'+key+'`)"><i class="fas fa-trash-alt"></i></td>');
        }
    });
    $('#unitsTable').append('<tr id="uTableFieldsEdit"></tr>');
    Object.keys(unitTypes[0]).forEach(function(key,index) {
        if (!fieldsOut.includes(key)) {
            $('#uTableFieldsEdit').append('<td class="colLoop klik" title="éditer '+key+' pour toutes les unités sélectionnées" onclick="loopEditField(`'+key+'`)"><i class="far fa-edit"></i></td>');
        }
    });
    $('#unitsTable').append('<tr id="uTableFieldsSort"></tr>');
    Object.keys(unitTypes[0]).forEach(function(key,index) {
        if (!fieldsOut.includes(key)) {
            $('#uTableFieldsSort').append('<td class="colTitle klik" title="classer par '+key+'" onclick="sortUnitTable(`'+key+'`)">'+key+'</td>');
        }
    });
    let rowStyle = 0;
    let rowClass = 'colData';
    let sortedUnits = _.sortBy(unitTypes,'type');
    sortedUnits = _.sortBy(unitTypes,unitsTableSort);
    if (unitsTableRev) {
        sortedUnits.reverse();
    }
    sortedUnits.forEach(function(unit) {
        if (!unitsOut.includes(unit.id)) {
            rowStyle = rowStyle+1;
            rowClass = 'colData';
            if (rowStyle > 1) {
                rowStyle = 0;
                rowClass = 'colDataBG';
            }
            $('#unitsTable').append('<tr id="uTableValues'+unit.id+'"></tr>');
            Object.keys(unitTypes[0]).forEach(function(key,index) {
                if (!fieldsOut.includes(key)) {
                    if (key != 'id') {
                        $('#uTableValues'+unit.id).append('<td class="'+rowClass+' klik" title="'+unit.type+' : '+key+'" onclick="unitEdit(`'+key+'`,`'+unit.id+'`,false)">'+unit[key]+'</td>');
                    } else {
                        $('#uTableValues'+unit.id).append('<td class="'+rowClass+'" title="'+unit.type+' : '+key+'">'+unit[key]+'</td>');
                    }
                }
            });
        }
    });
    unitsCRUDbuttons();
};
function unitsCRUDbuttons() {
    let options = [];
    options = fieldOptions('skills');
    $('#selectSkills').empty();
    $('#selectSkills').append('<option value="" selected>skills</option>');
    options.forEach(function(option) {
        $('#selectSkills').append('<option value="'+option.value+'">'+option.value+'</option>');
    });
    options = fieldOptions('categorie');
    $('#selectCategorie').empty();
    $('#selectCategorie').append('<option value="" selected>categorie</option>');
    options.forEach(function(option) {
        $('#selectCategorie').append('<option value="'+option.value+'">'+option.value+'</option>');
    });
    options = fieldOptions('nature');
    $('#selectNature').empty();
    $('#selectNature').append('<option value="" selected>nature</option>');
    options.forEach(function(option) {
        $('#selectNature').append('<option value="'+option.value+'">'+option.value+'</option>');
    });
    options = fieldOptions('stature');
    $('#selectStature').empty();
    $('#selectStature').append('<option value="" selected>stature</option>');
    options.forEach(function(option) {
        $('#selectStature').append('<option value="'+option.value+'">'+option.value+'</option>');
    });
    options = fieldOptions('moveType');
    $('#selectMoveType').empty();
    $('#selectMoveType').append('<option value="" selected>moveType</option>');
    options.forEach(function(option) {
        $('#selectMoveType').append('<option value="'+option.value+'">'+option.value+'</option>');
    });
    options = fieldOptions('portee');
    $('#selectPortee').empty();
    $('#selectPortee').append('<option value="" selected>portee</option>');
    options.forEach(function(option) {
        $('#selectPortee').append('<option value="'+option.value+'">'+option.value+'</option>');
    });
    options = fieldOptions('appui');
    $('#selectAppui').empty();
    $('#selectAppui').append('<option value="" selected>appui</option>');
    options.forEach(function(option) {
        $('#selectAppui').append('<option value="'+option.value+'">'+option.value+'</option>');
    });
    options = fieldOptions('icon');
    $('#selectCat').empty();
    $('#selectCat').append('<option value="" selected>icon</option>');
    options.forEach(function(option) {
        $('#selectCat').append('<option value="'+option.value+'">'+option.value+'</option>');
    });
    options = fieldOptions('genre');
    $('#selectGenre').empty();
    $('#selectGenre').append('<option value="" selected>genre</option>');
    options.forEach(function(option) {
        $('#selectGenre').append('<option value="'+option.value+'">'+option.value+'</option>');
    });
};
function toggleAddReplace() {
    if (filterAddMode) {
        filterAddMode = false;
        $('#arToggle').empty().append('Remplacer');
    } else {
        filterAddMode = true;
        $('#arToggle').empty().append('Ajouter');
    }
};
function sortUnitTable(field) {
    if (unitsTableSort == field) {
        if (unitsTableRev) {
            unitsTableRev = false;
        } else {
            unitsTableRev = true;
        }
    } else {
        unitsTableRev = false;
    }
    unitsTableSort = field;
    unitsCRUD();
};
function tableShowAllUnits() {
    unitsOut = [];
    unitsCRUD();
};
function tableShowUnitsSelect(select) {
    tableShowUnits(select.name,select.value);
};
function tableShowUnits(field,value) {
    if (!filterAddMode) {
        unitsOut = [];
    }
    let filterUT = [];
    if (typeof Number(value) == 'number' && !isNaN(Number(value))) {
        filterUT = _.filter(unitTypes, function(unit) {
            return (unit[field] != value);
        });
    } else {
        filterUT = _.filter(unitTypes, function(unit) {
            return (!unit[field].includes(value));
        });
    }
    filterUT.forEach(function(unit) {
        if (!unitsOut.includes(unit.id)) {
            unitsOut.push(unit.id);
        }
    });
    unitsCRUD();
};
function tableShowByIdRange(select) {
    tableShowById(select.name,Number(select.value));
};
function tableShowById(field,value) {
    if (!filterAddMode) {
        unitsOut = [];
    }
    let filterUT = _.filter(unitTypes, function(unit) {
        return (unit[field] > value || unit[field] < value-100);
    });
    filterUT.forEach(function(unit) {
        if (!unitsOut.includes(unit.id)) {
            unitsOut.push(unit.id);
        }
    });
    unitsCRUD();
};
function refreshTable() {
    unitsCRUD();
};
function removeField(field) {
    fieldsOut.push(field);
    unitsCRUD();
};
function showAllFields() {
    fieldsOut = ['coverAdj','moveAdj'];
    unitsCRUD();
};
function showBaseFields() {
    baseFields();
    unitsCRUD();
};
function baseFields() {
    fieldsOut = ['coverAdj','moveAdj'];
    let fieldIn = ['id','type','typeSing','genre','icon','illu','attitude','appui','stature','nature','domaine','categorie','portee','combatBoost','moral','loyaute','org','moveType','enk','detection','discretion','skills'];
    Object.keys(unitTypes[0]).forEach(function(key,index) {
        if (!fieldIn.includes(key)) {
            fieldsOut.push(key);
        }
    });
};
function showCombatFields() {
    fieldsOut = ['coverAdj','moveAdj'];
    let fieldIn = ['id','type','genre','icon','attitude','appui','hp','stature','nature','domaine','armure','esquive','parade','ammo','rapidite','actions','portee','prec','puissance','maxCibles','penetration','degatsSurNatures','degatsSurDomaines','combatBoost','endurance','moral','loyaute','org','skills'];
    Object.keys(unitTypes[0]).forEach(function(key,index) {
        if (!fieldIn.includes(key)) {
            fieldsOut.push(key);
        }
    });
    unitsCRUD();
};
function showMoveFields() {
    fieldsOut = ['coverAdj','moveAdj'];
    let fieldIn = ['id','type','genre','icon','rapidite','endurance','move','moveType','vegetAdj','escarpAdj','innondAdj','contenu','fardeau','charge','enk','detection','discretion','skills'];
    Object.keys(unitTypes[0]).forEach(function(key,index) {
        if (!fieldIn.includes(key)) {
            fieldsOut.push(key);
        }
    });
    unitsCRUD();
};
function unitPromptEdit(field,unitId,number,min,max,options) {
    let ok = true;
    let unitIndex = unitTypes.findIndex((obj => obj.id == unitId));
    let unit = unitTypes[unitIndex];
    let newValue;
    $('#uTableValues'+unit.id).children('td').addClass('colDataSel');
    if (!number) {
        newValue = prompt(unit.type+' : '+field,unitTypes[unitIndex][field]);
        if (newValue == '' || newValue === null) {
            ok = false;
        } else {
            newValue = newValue.trim();
        }
    } else {
        let minMax = '';
        if (min > Number.NEGATIVE_INFINITY && max < Number.POSITIVE_INFINITY) {
            minMax = ' ('+min+'-'+max+')';
        }
        newValue = Number(prompt(unit.type+' : '+field+minMax,unitTypes[unitIndex][field]));
        if (newValue == '' || newValue === null) {
            ok = false;
        } else if (newValue > max || newValue < min) {
            ok = false;
            alert('INVALIDE : doit être compris entre '+min+' et '+max+' !!');
        }
    }
    if (options.length >= 1) {
        let included = false;
        options.forEach(function(option) {
            if (option.value.includes(newValue)) {
                included = true;
            }
        });
        if (!included) {
            ok = false;
            alert('INVALIDE : "'+newValue+'" ne figure pas dans les options !!');
        }
    }
    if (ok) {
        if (unitTypes[unitIndex][field] != newValue) {
            unitTypes[unitIndex][field] = newValue;
            emitSingleChange(unitId,'unites',field,newValue);
            unitsCRUD();
        }
        $('#uTableValues'+unitId).children('td').removeClass('colDataSel');
    } else {
        loopEditStop = true;
    }
};
function unitCheckboxEdit(field,unitId,options) {
    let unitIndex = unitTypes.findIndex((obj => obj.id == unitId));
    let unit = unitTypes[unitIndex];
    let sel = '';
    $('#modalHead').empty().append(unit.typeSing+' : '+field);
    $('#modalFoot').empty().append('<div class="hSpace"></div>');
    $('#modalBody').empty().append('<form action="" id="'+field+'" onkeypress="return event.keyCode != 13;"></form>');
    let i = 0;
    options.forEach(function(option) {
        if (unit[field].includes(option.value+'_')) {sel = ' checked';} else {sel = '';}
        $('#'+field).append('<input type="checkbox" name="box'+i+'" value="'+option.value+'"'+sel+'> '+option.show+'<br>');
        i++;
    });
    $('#'+field).append('<br><button class="boutonVert" name="'+unit.id+'" type="button" id="'+field+'" onclick="unitCheckboxOut(this)">ok</button><br><br>');
    $('#uTableValues'+unit.id).children('td').addClass('colDataSel');
    modal.style.display = "block";
};
function unitCheckboxOut(select) {
    let unitId = Number(select.name);
    let unitIndex = unitTypes.findIndex((obj => obj.id == unitId));
    let newValue = '';
    let field = select.id;
    let i = 0;
    while (i < numOpt) {
        if (select.form[i].checked) {
            newValue = newValue+select.form[i].value+'_'
        }
        i++;
    }
    unitTypes[unitIndex][field] = newValue;
    emitSingleChange(unitId,'unites',field,newValue);
    $('#uTableValues'+unitId).children('td').removeClass('colDataSel');
    modal.style.display = "none";
    unitsCRUD();
};
function unitSelectEdit(field,unitId,options) {
    let unitIndex = unitTypes.findIndex((obj => obj.id == unitId));
    let unit = unitTypes[unitIndex];
    let sel = '';
    $('#modalHead').empty().append(unit.typeSing+' : '+field);
    $('#modalFoot').empty();
    $('#modalBody').empty().append('<select class="boutonVert" name="'+unitId+'" id="'+field+'" onchange="unitSelectOut(this);"><option value="" selected>&nbsp;</option></select>');
    options.forEach(function(option) {
        if (unit[field] == option.value) {sel = ' selected';} else {sel = '';}
        $('#'+field).append('<option value="'+option.value+'"'+sel+'>&nbsp;'+option.show+'</option>');
    });
    $('#uTableValues'+unit.id).children('td').addClass('colDataSel');
    modal.style.display = "block";
};
function unitSelectOut(select) {
    let unitId = Number(select.name);
    let unitIndex = unitTypes.findIndex((obj => obj.id == unitId));
    let newValue = select.value;
    let field = select.id;
    unitTypes[unitIndex][field] = newValue;
    emitSingleChange(unitId,'unites',field,newValue);
    $('#uTableValues'+unitId).children('td').removeClass('colDataSel');
    modal.style.display = "none";
    unitsCRUD();
};
function unitImageEdit(field,unitId) {
    let unitIndex = unitTypes.findIndex((obj => obj.id == unitId));
    let unit = unitTypes[unitIndex];
    let sel = '';
    $('#modalHead').empty().append(unit.typeSing+' : '+field);
    $('#modalFoot').empty();
    $('#modalBody').empty().append('<form action="" id="'+field+'" onkeypress="return event.keyCode != 13;"></form>');
    $('#'+field).append(' <img src="/static/img/units/'+unit.illu+'" width="300"><br>');
    $('#'+field).append('<input type="text" name="image" value="'+unit.illu+'"><br>');
    $('#'+field).append('<br><button class="boutonVert" name="'+unit.id+'" type="button" id="'+field+'" onclick="unitImageOut(this)">ok</button><br><br>');
    $('#uTableValues'+unit.id).children('td').addClass('colDataSel');
    modal.style.display = "block";
};
function unitImageOut(select) {
    let unitId = Number(select.name);
    let unitIndex = unitTypes.findIndex((obj => obj.id == unitId));
    console.log(select.form[0].value);
    let newValue = select.form[0].value;
    let field = select.id;
    unitTypes[unitIndex][field] = newValue;
    emitSingleChange(unitId,'unites',field,newValue);
    $('#uTableValues'+unitId).children('td').removeClass('colDataSel');
    modal.style.display = "none";
    unitsCRUD();
};
function unitEdit(field,unitId,loop) {
    // quel type d'edit pour chaque champ?
    let options = fieldOptions(field);
    numOpt = options.length;
    if (options.length >= 1 && !loop) {
        if (field == 'skills' || field == 'categorie') {
            unitCheckboxEdit(field,unitId,options);
            return;
        } else {
            unitSelectEdit(field,unitId,options);
            return;
        }
    }
    if (field == 'illu' && !loop) {
        unitImageEdit(field,unitId);
        return;
    }
    let unitIndex = unitTypes.findIndex((obj => obj.id == unitId));
    let unit = unitTypes[unitIndex];
    let min = Number.NEGATIVE_INFINITY;
    let max = Number.POSITIVE_INFINITY;
    if (field == 'endurance') {
        min = -1;
        max = 100;
    }
    if (field == 'armure') {
        min = 0;
        max = 300;
    }
    if (typeof unit[field] == 'number') {
        unitPromptEdit(field,unitId,true,min,max,options);
        return;
    } else if (typeof unit[field] == 'string') {
        unitPromptEdit(field,unitId,false,min,max,options);
        return;
    }
};
function loopEditField(field) {
    loopEditStop = false;
    let sortedUnits = _.sortBy(unitTypes,'type');
    sortedUnits = _.sortBy(unitTypes,unitsTableSort);
    if (unitsTableRev) {
        sortedUnits.reverse();
    }
    sortedUnits.forEach(function(unit) {
        if (!unitsOut.includes(unit.id) && !loopEditStop) {
            unitEdit(field,unit.id,true);
        }
    });
};
