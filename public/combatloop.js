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
    fightPopHere.forEach(function(squad,index) {
        if (squad.player === pseudo) {
            ownCount = ownCount+squad.number;
            if (squad.appui >= 2) {
                ownACouvrir = ownACouvrir+squad.number;
            } else if (squad.appui == 0) {
                ownCouvreurs = ownCouvreurs+squad.number;
            }
        } else {
            oppCount = oppCount+squad.number;
            if (squad.appui >= 2) {
                oppACouvrir = oppACouvrir+squad.number;
            } else if (squad.appui == 0) {
                oppCouvreurs = oppCouvreurs+squad.number;
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
            cSquad.prioMelee = 0;
            cSquad.prioRange = 0;
            cSquad.prioNone = 0;
            cPop.push(cSquad);
            i = i+24;
        }
    });
    ownOrg = calcOrg(attUnitId,false); // ATTENTION!!! devra être TRUE quand combatId sera en place xxxxxxxxxx
    oppOrg = calcOrg(defUnitId,false);
    ownProtection = calcProtection(ownOrg,ownACouvrir,ownCouvreurs,0,ownCount,oppCount);
    oppProtection = calcProtection(oppOrg,oppACouvrir,oppCouvreurs,0,oppCount,ownCount);
    let protection = 0;
    let prioRoll = 50;
    cPop.forEach(function(squad) {
        if (squad.player === pseudo) {
            protection = ownProtection;
        } else {
            protection = oppProtection;
        }
        prioRoll = rand.rand(1,prioDice);
        squad.prioMelee = calcPriority(squad.appui,protection,10,10,'melee',prioRoll);
        squad.prioRange = calcPriority(squad.appui,protection,10,10,'range',prioRoll);
        squad.prioNone = calcPriority(squad.appui,protection,10,10,'none',prioRoll);
    });
    console.log(cPop);
    console.log('ownOrg '+ownOrg);
    console.log('oppOrg '+oppOrg);
    console.log('ownProtection '+ownProtection);
    console.log('oppProtection '+oppProtection);
};
