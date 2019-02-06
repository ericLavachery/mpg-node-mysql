function fightInit() {
    // mettre les unités (dans pop) en combat : combatId
    // faire la db cpop
    // chaque bataillon plus grand que 24 unités est divisé
    // il garde le id de pop (popId), partagé donc par plusieurs bataillons
    // les bataillons réels (pop) sont bloqués le temps du combat (et les joueurs impliqués ne peuvent pas commencer un second combat ni passer au jour suivant)
    // à la fin du combat, les doublons popId créent des nouveaux bataillons (là où il n'y a pas de doublon, le bataillon pop est changé)
    // ________________________________________________________________________________
    // Il faudra faire une sélection de QUI est impliqué
    // au premier tour : l'unité d'attaque (et son groupe) + l'unité attaquée (et son groupe)
    // après, en fonction des ordres, d'autres groupes d'unités sur place (tenir compte aussi de l'attitude)
    let i = 0;
    let theId = 0;
    let cSquad = {};
    let mcRap = 0;
    let fightPopHere = _.filter(pop, function(squad) {
        return (squad.tileId == fightMapId && (squad.player === pseudo || squad.player === fightOpp));
    });
    fightPopHere = _.sortBy(_.sortBy(_.sortBy(_.sortBy(fightPopHere,'number'),'type'),'appui'),'player');
    fightPopHere.forEach(function(squad,index) {
        if (squad.player === pseudo) {
            cTeams.own.count = cTeams.own.count+squad.number;
            if (squad.appui >= 2) {
                cTeams.own.aCouvrir = cTeams.own.aCouvrir+squad.number;
            } else if (squad.appui == 0) {
                cTeams.own.couvreurs = cTeams.own.couvreurs+squad.number;
            }
        } else {
            cTeams.opp.count = cTeams.opp.count+squad.number;
            if (squad.appui >= 2) {
                cTeams.opp.aCouvrir = cTeams.opp.aCouvrir+squad.number;
            } else if (squad.appui == 0) {
                cTeams.opp.couvreurs = cTeams.opp.couvreurs+squad.number;
            }
        }
        // Division en squad de 24-
        i = 0;
        while (i < squad.number) {
            theId = theId+1;
            cSquad = {};
            cSquad.id = theId;
            cSquad.popId = squad.id;
            cSquad.typeId = squad.typeId;
            cSquad.player = squad.player;
            if (squad.player === pseudo) {
                cSquad.team = 'own';
            } else {
                cSquad.team = 'opp';
            }
            cSquad.type = squad.type;
            cSquad.typeSing = squad.typeSing;
            if (squad.number-i > 24) {
                cSquad.number = 24;
            } else {
                cSquad.number = squad.number-i;
            }
            cSquad.genre = squad.genre;
            cSquad.illu = squad.illu;
            cSquad.attitude = squad.attitude;
            cSquad.hp = squad.hp;
            cSquad.esquive = squad.esquive;
            // avec bonus coverAdj/terCover ?
            cSquad.parade = squad.parade;
            cSquad.armure = squad.armure;
            cSquad.stature = squad.stature;
            cSquad.size = calcSize(squad.stature);
            cSquad.oppSlot = calcOppSlot(cSquad.size);
            cSquad.categorie = squad.categorie;
            cSquad.nature = squad.nature;
            cSquad.domaine = squad.domaine;
            cSquad.endurance = squad.endurance;
            cSquad.shape = calcShape(squad.id);
            cSquad.actions = squad.actions;
            cSquad.puissance = squad.puissance;
            cSquad.portee = squad.portee;
            cSquad.appui = squad.appui;
            cSquad.penetration = squad.penetration;
            cSquad.rapidite = squad.rapidite;
            cSquad.degNatures = squad.degatsSurNatures;
            cSquad.degDomaines = squad.degatsSurDomaines;
            cSquad.prec = calcBasePrec(squad.id);
            cSquad.combatBoost = squad.combatBoost;
            cSquad.skills = squad.skills;
            cSquad.moral = squad.moral;
            cSquad.org = squad.org;
            cSquad.rapChoice = calcMCRap(squad.rapidite,squad.portee,fightMapId,squad.id);
            cSquad.rollChoice = rollChoiceDice(cSquad.rapChoice);
            cSquad.numOpp = 0;
            cSquad.targetOK = false;
            cSquad.targets = [];
            cSquad.HPeach = squad.hp;
            cSquad.HPbat = cSquad.HPeach*cSquad.number;
            cPop.push(cSquad);
            i = i+24;
        }
    });
    cTeams.own.org = calcOrg(attUnitId,false); // ATTENTION!!! devra être TRUE quand combatId sera en place xxxxxxxxxx
    cTeams.opp.org = calcOrg(defUnitId,false);
    cTeams.own.protection = calcProtection(cTeams.own.org,cTeams.own.aCouvrir,cTeams.own.couvreurs,0,cTeams.own.count,cTeams.opp.count);
    cTeams.opp.protection = calcProtection(cTeams.opp.org,cTeams.opp.aCouvrir,cTeams.opp.couvreurs,0,cTeams.opp.count,cTeams.own.count);
    let protection = 0;
    let prioRoll = 50;
    cPop.forEach(function(squad) {
        // if (squad.player === pseudo) {
        //     protection = cTeams.own.protection;
        //     org = cTeams.own.org;
        // } else {
        //     protection = cTeams.opp.protection;
        //     org = cTeams.opp.org;
        // }
        prioRoll = rand.rand(1,prioDice);
        squad.prioMelee = calcPriority(squad.appui,cTeams[squad.team].protection,10,10,'melee',prioRoll);
        squad.prioRange = calcPriority(squad.appui,cTeams[squad.team].protection,10,10,'range',prioRoll);
        squad.prioNone = calcPriority(squad.appui,cTeams[squad.team].protection,10,10,'none',prioRoll);
        squad.prioAssa = calcPriority(squad.appui,cTeams[squad.team].protection,10,10,'assa',prioRoll);
        squad.maxOpp = calcMaxOpp(squad.size,cTeams[squad.team].org,0);
    });
    console.log(cTeams);
    console.log(cPop);
    console.log('cTeams.own.org '+cTeams.own.org);
    console.log('cTeams.opp.org '+cTeams.opp.org);
    console.log('cTeams.own.protection '+cTeams.own.protection);
    console.log('cTeams.opp.protection '+cTeams.opp.protection);
    fightTurn('melee');
};
function fightTurn(turnType) {
    $('#fightDetail').empty();
    cTurn = cTurn+1;
    let cpChoice = _.sortBy(cPop,'rollChoice').reverse();
    let cppMelee = _.sortBy(cPop,'prioMelee').reverse();
    let cppRange = _.sortBy(cPop,'prioRange').reverse();
    let cppNone = _.sortBy(cPop,'prioNone').reverse();
    let cppAssa = _.sortBy(cPop,'prioAssa').reverse();
    let targetOK = false;
    cpChoice.forEach(function(squad) {
        $('#fightDetail').append(squad.player+' : '+squad.number+' '+xType(squad.popId,false)+'<br>');
        targetOK = false;
        if (squad.portee < 2) {
            cppMelee.forEach(function(target) {
                // console.log('squad '+squad.player+squad.number+squad.type);
                // console.log('target '+target.player+target.number+target.type+target.prioMelee);
                if (!targetOK && squad.player != target.player && (target.prioMelee > 100 || target.appui == 0)) {
                    targetOK = true;
                    $('#fightDetail').append('<span class="bigSpace"></span>'+target.number+' '+xType(target.popId,false)+'<br>');
                }
            });
        } else {
            cppRange.forEach(function(target) {

            });
        }
    });
};
