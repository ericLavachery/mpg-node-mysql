function fieldOptions(field) {
    let options = [];
    let newOpt = {};
    // if (field == 'illu') {
    //     unitsImg.forEach(function(file) {
    //         newOpt = {};
    //         newOpt.value = file;
    //         newOpt.show = newOpt.value;
    //         options.push(newOpt);
    //     });
    // }
    if (field == 'skills') {
        let sortedSkills = _.sortBy(_.sortBy(skills,'name'),'ordre');
        sortedSkills.forEach(function(skill) {
            newOpt = {};
            newOpt.value = skill.name;
            if (skill.expl != '') {
                newOpt.show = newOpt.value+'&nbsp; ('+skill.expl+')';
            } else {
                newOpt.show = newOpt.value;
            }
            options.push(newOpt);
        });
    }
    if (field == 'categorie') {
        let sortedCategs = _.sortBy(_.sortBy(categs,'name'),'ordre');
        sortedCategs.forEach(function(cat) {
            newOpt = {};
            newOpt.value = cat.name;
            if (cat.expl != '') {
                newOpt.show = newOpt.value+'&nbsp; ('+cat.expl+')';
            } else {
                newOpt.show = newOpt.value;
            }
            options.push(newOpt);
        });
    }
    // if (field == 'categorie') {
    //     newOpt = {};
    //     newOpt.value = 'civil';
    //     newOpt.show = newOpt.value;
    //     options.push(newOpt);
    //     newOpt = {};
    //     newOpt.value = 'soldat';
    //     newOpt.show = newOpt.value;
    //     options.push(newOpt);
    //     newOpt = {};
    //     newOpt.value = 'mage';
    //     newOpt.show = newOpt.value;
    //     options.push(newOpt);
    //     newOpt = {};
    //     newOpt.value = 'relig';
    //     newOpt.show = newOpt.value+'&nbsp; (religieux)';
    //     options.push(newOpt);
    //     newOpt = {};
    //     newOpt.value = 'cult';
    //     newOpt.show = newOpt.value+'&nbsp; (cultiste)';
    //     options.push(newOpt);
    //     newOpt = {};
    //     newOpt.value = 'chef';
    //     newOpt.show = newOpt.value;
    //     options.push(newOpt);
    //     newOpt = {};
    //     newOpt.value = 'hll';
    //     newOpt.show = newOpt.value+'&nbsp; (hors-la-loi)';
    //     options.push(newOpt);
    //     newOpt = {};
    //     newOpt.value = 'brig';
    //     newOpt.show = newOpt.value+'&nbsp; (brigand)';
    //     options.push(newOpt);
    //     newOpt = {};
    //     newOpt.value = 'salt';
    //     newOpt.show = newOpt.value+'&nbsp; (saltimbanque)';
    //     options.push(newOpt);
    //     newOpt = {};
    //     newOpt.value = 'spy';
    //     newOpt.show = newOpt.value+'&nbsp; (espion)';
    //     options.push(newOpt);
    //     newOpt = {};
    //     newOpt.value = 'milice';
    //     newOpt.show = newOpt.value;
    //     options.push(newOpt);
    //     newOpt = {};
    //     newOpt.value = 'pv';
    //     newOpt.show = newOpt.value+'&nbsp; (peau verte)';
    //     options.push(newOpt);
    //     newOpt = {};
    //     newOpt.value = 'orc';
    //     newOpt.show = newOpt.value;
    //     options.push(newOpt);
    //     newOpt = {};
    //     newOpt.value = 'gob';
    //     newOpt.show = newOpt.value+'&nbsp; (gobelin)';
    //     options.push(newOpt);
    //     newOpt = {};
    //     newOpt.value = 'gnome';
    //     newOpt.show = newOpt.value;
    //     options.push(newOpt);
    //     newOpt = {};
    //     newOpt.value = 'kob';
    //     newOpt.show = newOpt.value+'&nbsp; (kobold)';
    //     options.push(newOpt);
    //     newOpt = {};
    //     newOpt.value = 'nain';
    //     newOpt.show = newOpt.value;
    //     options.push(newOpt);
    //     newOpt = {};
    //     newOpt.value = 'elfe';
    //     newOpt.show = newOpt.value;
    //     options.push(newOpt);
    //     newOpt = {};
    //     newOpt.value = 'saur';
    //     newOpt.show = newOpt.value+'&nbsp; (saurien)';
    //     options.push(newOpt);
    //     newOpt = {};
    //     newOpt.value = 'animal';
    //     newOpt.show = newOpt.value;
    //     options.push(newOpt);
    //     newOpt = {};
    //     newOpt.value = 'monstre';
    //     newOpt.show = newOpt.value;
    //     options.push(newOpt);
    //     newOpt = {};
    //     newOpt.value = 'barbare';
    //     newOpt.show = newOpt.value;
    //     options.push(newOpt);
    //     newOpt = {};
    //     newOpt.value = 'rebelle';
    //     newOpt.show = newOpt.value;
    //     options.push(newOpt);
    //     newOpt = {};
    //     newOpt.value = 'marin';
    //     newOpt.show = newOpt.value;
    //     options.push(newOpt);
    //     newOpt = {};
    //     newOpt.value = 'archer';
    //     newOpt.show = newOpt.value+'&nbsp; (ou autre arme à distance)';
    //     options.push(newOpt);
    //     newOpt = {};
    //     newOpt.value = 'garde';
    //     newOpt.show = newOpt.value;
    //     options.push(newOpt);
    //     newOpt = {};
    //     newOpt.value = 'ugenie';
    //     newOpt.show = newOpt.value+'&nbsp; (unité de génie)';
    //     options.push(newOpt);
    //     newOpt = {};
    //     newOpt.value = 'chariot';
    //     newOpt.show = newOpt.value;
    //     options.push(newOpt);
    //     newOpt = {};
    //     newOpt.value = 'machine';
    //     newOpt.show = newOpt.value;
    //     options.push(newOpt);
    //     newOpt = {};
    //     newOpt.value = 'mortv';
    //     newOpt.show = newOpt.value+'&nbsp; (mort-vivant)';
    //     options.push(newOpt);
    //     newOpt = {};
    //     newOpt.value = 'batciv';
    //     newOpt.show = newOpt.value+'&nbsp; (bâtiment civil)';
    //     options.push(newOpt);
    //     newOpt = {};
    //     newOpt.value = 'batmil';
    //     newOpt.show = newOpt.value+'&nbsp; (bâtiment militaire)';
    //     options.push(newOpt);
    //     newOpt = {};
    //     newOpt.value = 'fortif';
    //     newOpt.show = newOpt.value+'&nbsp; (fortification)';
    //     options.push(newOpt);
    //     newOpt = {};
    //     newOpt.value = 'fdc';
    //     newOpt.show = newOpt.value+'&nbsp; (feu de camp)';
    //     options.push(newOpt);
    //     newOpt = {};
    //     newOpt.value = 'produc';
    //     newOpt.show = newOpt.value+'&nbsp; (producteur ou récolteur)';
    //     options.push(newOpt);
    // }
    if (field == 'genre') {
        newOpt = {};
        newOpt.value = 'unité';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'bâtiment';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'ressource';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'coffre';
        newOpt.show = newOpt.value;
        options.push(newOpt);
    }
    if (field == 'icon') {
        newOpt = {};
        newOpt.value = 'res';
        newOpt.show = newOpt.value+'&nbsp; (ressource)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'wrk';
        newOpt.show = newOpt.value+'&nbsp; (travailleur)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'spy';
        newOpt.show = newOpt.value+'&nbsp; (espion)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'sld';
        newOpt.show = newOpt.value+'&nbsp; (soldat)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'shp';
        newOpt.show = newOpt.value+'&nbsp; (navire)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'bsp';
        newOpt.show = newOpt.value+'&nbsp; (bâtiment furtif)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'bld';
        newOpt.show = newOpt.value+'&nbsp; (bâtiment)';
        options.push(newOpt);
    }
    if (field == 'attitude') {
        newOpt = {};
        newOpt.value = 'at';
        newOpt.show = newOpt.value+'&nbsp; (attaque)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'ass';
        newOpt.show = newOpt.value+'&nbsp; (attaque sauf suicide)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'af';
        newOpt.show = newOpt.value+'&nbsp; (attaque faibles)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'amn';
        newOpt.show = newOpt.value+'&nbsp; (attaque moins nombreux)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'd';
        newOpt.show = newOpt.value+'&nbsp; (fuite ou défense)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'f';
        newOpt.show = newOpt.value+'&nbsp; (fuite ou rédition)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'i';
        newOpt.show = newOpt.value+'&nbsp; (sans objet)';
        options.push(newOpt);
    }
    if (field == 'appui') {
        newOpt = {};
        newOpt.value = 0;
        newOpt.show = newOpt.value+'&nbsp; (mêlée)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 1;
        newOpt.show = newOpt.value+'&nbsp; (portée 1)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 2;
        newOpt.show = newOpt.value+'&nbsp; (portée 2+)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 3;
        newOpt.show = newOpt.value+'&nbsp; (petits chefs, éclaireurs, civils)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 4;
        newOpt.show = newOpt.value+'&nbsp; (chefs et autres unités très importantes)';
        options.push(newOpt);
    }
    if (field == 'stature') {
        newOpt = {};
        newOpt.value = 1;
        newOpt.show = newOpt.value+'&nbsp; (pixie)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 2;
        newOpt.show = newOpt.value+'&nbsp; (gobelin)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 3;
        newOpt.show = newOpt.value+'&nbsp; (humain)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 4;
        newOpt.show = newOpt.value+'&nbsp; (orc)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 5;
        newOpt.show = newOpt.value+'&nbsp; (ogre)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 6;
        newOpt.show = newOpt.value+'&nbsp; (géants)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 7;
        newOpt.show = newOpt.value+'&nbsp; (mumakil)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 8;
        newOpt.show = newOpt.value+'&nbsp; (kraken)';
        options.push(newOpt);
    }
    if (field == 'nature') {
        newOpt = {};
        newOpt.value = 'Bâtiment';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Mécanique';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Vivant';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Mort';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Magique';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Spécial';
        newOpt.show = newOpt.value;
        options.push(newOpt);
    }
    if (field == 'domaine') {
        newOpt = {};
        newOpt.value = 'Terrestre';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Marin';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Volant';
        newOpt.show = newOpt.value;
        options.push(newOpt);
    }
    if (field == 'portee') {
        newOpt = {};
        newOpt.value = 0;
        newOpt.show = newOpt.value+'&nbsp; (mêlée)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 1;
        newOpt.show = newOpt.value+'&nbsp; (javelots)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 2;
        newOpt.show = newOpt.value+'&nbsp; (arcs)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 3;
        newOpt.show = newOpt.value+'&nbsp; (arcs longs)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 4;
        newOpt.show = newOpt.value+'&nbsp; (engins)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 5;
        newOpt.show = newOpt.value+'&nbsp; (engins)';
        options.push(newOpt);
    }
    if (field == 'moveType') {
        newOpt = {};
        newOpt.value = 'ter';
        newOpt.show = newOpt.value+'&nbsp; (terrestre)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'air';
        newOpt.show = newOpt.value+'&nbsp; (volant - bas)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'alt';
        newOpt.show = newOpt.value+'&nbsp; (volant - altitude)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'cab';
        newOpt.show = newOpt.value+'&nbsp; (cabbotage seulement)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'mix';
        newOpt.show = newOpt.value+'&nbsp; (moyen partout)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'mer';
        newOpt.show = newOpt.value+'&nbsp; (bonus haute mer, malus cabbotage)';
        options.push(newOpt);
    }
    if (field == 'vegetAdj' || field == 'escarpAdj' || field == 'innondAdj') {
        newOpt = {};
        newOpt.value = 0;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 5;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 10;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 15;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 20;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 25;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 30;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 35;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 40;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 50;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 55;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 60;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 65;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 70;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 75;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 80;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 85;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 90;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 95;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 100;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 105;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 110;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 115;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 120;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 125;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 130;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 140;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 150;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 160;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 170;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 180;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 200;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 225;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 250;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 275;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 300;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 350;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 400;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 450;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 500;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 600;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 700;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 800;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 1000;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
    }
    if (field == 'degatsSurNatures') {
        newOpt = {};
        newOpt.value = 'Vivant';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Vivant_Mort';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Vivant_Magique';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Vivant_Mécanique';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Vivant_Bâtiment';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Vivant_Mort_Magique';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Vivant_Mort_Mécanique';
        newOpt.show = newOpt.value+'&nbsp; (*) BASE';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Vivant_Magique_Mécanique';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Vivant_Mécanique_Bâtiment';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Vivant_Mort_Bâtiment';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Vivant_Magique_Bâtiment';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Vivant_Mort_Magique_Mécanique';
        newOpt.show = newOpt.value+'&nbsp; (*) +MAGIQUE';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Vivant_Mort_Magique_Bâtiment';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Vivant_Mort_Mécanique_Bâtiment';
        newOpt.show = newOpt.value+'&nbsp; (*) +BATIMENT';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Vivant_Magique_Mécanique_Bâtiment';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Vivant_Mort_Magique_Mécanique_Bâtiment';
        newOpt.show = newOpt.value+'&nbsp; (*) TOUT';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Mécanique';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Bâtiment';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Mécanique_Bâtiment';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Mort';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Mort_Magique';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Mort_Mécanique';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Mort_Bâtiment';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Mort_Magique_Mécanique';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Mort_Magique_Bâtiment';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Mort_Mécanique_Bâtiment';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Mort_Magique_Mécanique_Bâtiment';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Magique';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Magique_Mécanique';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Magique_Bâtiment';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Magique_Mécanique_Bâtiment';
        newOpt.show = newOpt.value;
        options.push(newOpt);
    }
    if (field == 'degatsSurDomaines') {
        newOpt = {};
        newOpt.value = 'Terrestre';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Terrestre_Marin_Volant';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Terrestre_Marin';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Marin';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Volant';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Terrestre_Volant';
        newOpt.show = newOpt.value;
        options.push(newOpt);
    }
    return options;
};
