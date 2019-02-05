function fightInit() {
    // faire la db cpop
    // chaque bataillon plus grand que 24 unités est divisé
    // il garde le id de pop (popId), partagé donc par plusieurs bataillons
    // les bataillons réels (pop) sont bloqués le temps du combat (et les joueurs impliqués ne peuvent pas commencer un second combat ni passer au jour suivant)
    // à la fin du combat, les doublons popId créent des nouveaux bataillons (là où il n'y a pas de doublon, le bataillon pop est changé)
    let cPop = [];
    let oppCount = 0;
    let ownCount = 0;
    let oppAC = 0;
    let ownAC = 0;
    let oppCV = 0;
    let ownCV = 0;
    let cSquad = {};
    let mcRap = 0;
    let fightPopHere = _.filter(pop, function(squad) {
        return (squad.tileId == fightMapId && (squad.player === pseudo || squad.player === fightOpp));
    });
    fightPopHere.forEach(function(squad,index) {
        if (squad.player === pseudo) {
            ownCount = ownCount+squad.number;
            if (squad.appui >= 2) {
                ownAC = ownAC+squad.number;
            } else if (squad.appui == 0) {
                ownCV = ownCV+squad.number;
            }
        } else {
            oppCount = oppCount+squad.number;
            if (squad.appui >= 2) {
                oppAC = oppAC+squad.number;
            } else if (squad.appui == 0) {
                oppCV = oppCV+squad.number;
            }
        }
        cSquad = {};
        cSquad.id = index;
        cSquad.popId = squad.id;
        cSquad.typeId = squad.typeId;
        cSquad.player = squad.player;
        cSquad.type = squad.type;
        cSquad.typeSing = squad.typeSing;
        cSquad.number = squad.number;
        cSquad.genre = squad.genre;
        cSquad.illu = squad.illu;
        cSquad.attitude = squad.attitude;
        cSquad.hp = squad.hp;
        cSquad.esquive = squad.esquive;
        // avec bonus coverAdj/terCover ?
        cSquad.parade = squad.parade;
        cSquad.armure = squad.armure;
        cSquad.stature = squad.stature;
        cSquad.categorie = squad.categorie;
        cSquad.nature = squad.nature;
        cSquad.domaine = squad.domaine;
        cSquad.endurance = squad.endurance;
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
        cSquad.HPbat = squad.hp*cSquad.number;
        cSquad.prioMelee = 0;
        cSquad.prioRange = 0;
        cSquad.prioNone = 0;
        cPop.push(cSquad);
    });
    console.log(cPop);
};
