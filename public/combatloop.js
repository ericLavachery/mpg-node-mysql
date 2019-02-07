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
    fightPopHere.forEach(function(squad) {
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
                cSquad.color = 'jaune';
            } else {
                cSquad.team = 'opp';
                cSquad.color = 'ciel';
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
            cSquad.precBase = calcFightBasePrec(squad.id);
            cSquad.combatBoost = squad.combatBoost;
            cSquad.skills = squad.skills;
            cSquad.moral = squad.moral;
            cSquad.org = squad.org;
            cSquad.rapChoice = calcMCRap(squad.rapidite,squad.portee,fightMapId,squad.id);
            cSquad.numOpp = 0;
            cSquad.numTarg = 0;
            cSquad.targetsOK = false;
            cSquad.HPeach = squad.hp;
            cSquad.HPbat = cSquad.HPeach*cSquad.number;
            cPop.push(cSquad);
            i = i+24;
        }
    });
    cTeamChecks();
    cPopChecks();
    console.log(cTeams);
    console.log(cPop);
    console.log('cTeams.own.org '+cTeams.own.org);
    console.log('cTeams.opp.org '+cTeams.opp.org);
    console.log('cTeams.own.protection '+cTeams.own.protection);
    console.log('cTeams.opp.protection '+cTeams.opp.protection);
    fightTurn('melee');
};
function cTeamChecks() {
    cTeams.own.count = 0;
    cTeams.opp.count = 0;
    cTeams.own.aCouvrir = 0;
    cTeams.opp.aCouvrir = 0;
    cTeams.own.couvreurs = 0;
    cTeams.opp.couvreurs = 0;
    cTeams.own.org = 0;
    cTeams.opp.org = 0;
    cTeams.own.protection = 0;
    cTeams.opp.protection = 0;
    cPop.forEach(function(squad) {
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
    });
    cTeams.own.org = calcOrg(attUnitId,false); // ATTENTION!!! devra être TRUE quand combatId sera en place xxxxxxxxxx
    cTeams.opp.org = calcOrg(defUnitId,false);
    cTeams.own.protection = calcProtection(cTeams.own.org,cTeams.own.aCouvrir,cTeams.own.couvreurs,0,cTeams.own.count,cTeams.opp.count);
    cTeams.opp.protection = calcProtection(cTeams.opp.org,cTeams.opp.aCouvrir,cTeams.opp.couvreurs,0,cTeams.opp.count,cTeams.own.count);
};
function cPopChecks() {
    cPop.forEach(function(squad) {
        if (rand.rand(1,100) > squad.endurance) {
            squad.shape = squad.shape-3;
        }
        squad.prec = calcShapePrec(squad.precBase,squad.shape);
        squad.rollChoice = rollChoiceDice(squad.rapChoice);
        let prioRoll = rand.rand(1,prioDice);
        squad.prioMelee = calcPriority(squad.appui,cTeams[squad.team].protection,10,10,'melee',prioRoll); // 10,10 is PA attack,defense
        squad.prioRange = calcPriority(squad.appui,cTeams[squad.team].protection,10,10,'range',prioRoll);
        squad.prioNone = calcPriority(squad.appui,cTeams[squad.team].protection,10,10,'none',prioRoll);
        squad.prioAssa = calcPriority(squad.appui,cTeams[squad.team].protection,10,10,'assa',prioRoll);
        squad.maxOpp = calcMaxOpp(squad.size,cTeams[squad.team].org,0)*squad.number; // 0 is fortification
    });
};
function fightTurn(turnType) {
    $('#fightDetail').empty();
    cTurn = cTurn+1;
    cpChoice = _.sortBy(cPop,'rollChoice').reverse();
    cppMelee = _.sortBy(cPop,'prioMelee').reverse();
    cppRange = _.sortBy(cPop,'prioRange').reverse();
    cppNone = _.sortBy(cPop,'prioNone').reverse();
    cppAssa = _.sortBy(cPop,'prioAssa').reverse();
    $('#fightDetail').append('<span class="jaune">'+cTeams.own.player+'</span> vs <span class="ciel">'+cTeams.opp.player+'</span><br>');
    $('#fightDetail').append('<span class="jaune">'+cTeams.own.count+' combatants | org '+cTeams.own.org+' | prot '+cTeams.own.protection+'</span><br>');
    $('#fightDetail').append('<span class="ciel">'+cTeams.opp.count+' combatants | org '+cTeams.opp.org+' | prot '+cTeams.opp.protection+'</span><br>');
    $('#fightDetail').append('<br>');
    cPop.reverse().forEach(function(squad) {
        $('#fightDetail').append('<span class="'+squad.color+'">'+squad.player+'</span> : '+squad.number+' '+xType(squad.popId,false)+' ('+squad.id+')<br>');
    });
    $('#fightDetail').append('<br>');
    $('#fightDetail').append('<span class="mauve">Tour '+cTurn+'</span><br>');
    cpChoice.forEach(function(squad) {
        $('#fightDetail').append('<br>');
        $('#fightDetail').append('<span class="'+squad.color+'">'+squad.player+' : '+squad.number+' '+xType(squad.popId,false)+'</span> ('+squad.id+')<br>');
        $('#fightDetail').append('Targets Left : '+(squad.number-squad.numTarg)+'<br>');
        if (squad.number-squad.numTarg > 0 && (squad.appui < 3 || squad.portee >= 1)) {
            targetsLoop(squad,true);
        }
        if (squad.number-squad.numTarg > 0 && (squad.appui < 3 || squad.portee >= 1)) {
            $('#fightDetail').append('--------------------<br>');
            $('#fightDetail').append('Targets Left : '+(squad.number-squad.numTarg)+'<br>');
            targetsLoop(squad,false);
        }
    });
    $('#fightDetail').append('<br>');
    cPop.forEach(function(squad) {
        $('#fightDetail').append('<span class="'+squad.color+'">'+squad.player+'</span> : <span class="blanc">'+squad.number+'</span> '+xType(squad.popId,false)+' ('+squad.id+') cibles: <span class="blanc">'+squad.numTarg+'</span> opposants: <span class="vert">'+squad.numOpp+'</span><br>');
    });
    cTeamChecks();
    cPopChecks();
};
function targetsLoop(squad,first) {
    let cpp = [];
    let prio = 0;
    let lessOpp = 99;
    let relativeOpp = 99;
    if (squad.portee < 2) {
        cpp = cppMelee;
    } else {
        cpp = cppRange;
    }
    lessOpp = 99;
    cpp.forEach(function(target) {
        if (target.player != squad.player) {
            if (squad.portee < 2) {
                prio = target.prioMelee;
            } else {
                prio = target.prioRange;
            }
            if (prio > 100 || target.appui == 0) {
                relativeOpp = calcRelativeOpp(target);
                if (relativeOpp < lessOpp) {
                    lessOpp = relativeOpp;
                }
            }
        }
    });
    $('#fightDetail').append('lessOpp : '+lessOpp+'<br>');
    cpp.forEach(function(target) {
        if (target.player != squad.player && squad.number-squad.numTarg > 0) {
            if (squad.portee < 2) {
                prio = target.prioMelee;
            } else {
                prio = target.prioRange;
            }
            if (prio > 100 || target.appui == 0) {
                $('#fightDetail').append('--------------------<br>');
                $('#fightDetail').append('<span class="retrait"></span>'+target.player+' : '+target.number+' '+xType(target.popId,false)+' ('+target.id+') opposants: '+target.numOpp+'<br>');
                relativeOpp = calcRelativeOpp(target);
                $('#fightDetail').append('<span class="retrait"></span>relativeOpp : '+relativeOpp+'<br>');
                if (!squad.targetsOK && (relativeOpp == lessOpp || !first) && target.numOpp < target.maxOpp) {
                    bagarre(squad,target,lessOpp,first);
                }
            }
        }
    });
};
function calcRelativeOpp(target) {
    let relativeOpp = 0;
    if (target.number > target.numOpp) {
        relativeOpp = 0;
    } else if (target.number*2 > target.numOpp) {
        relativeOpp = 1;
    } else if (target.number*3 > target.numOpp) {
        relativeOpp = 2;
    } else if (target.number*4 > target.numOpp) {
        relativeOpp = 3;
    } else if (target.number*5 > target.numOpp) {
        relativeOpp = 4;
    } else if (target.number*6 > target.numOpp) {
        relativeOpp = 5;
    }
    return relativeOpp;
};
function bagarre(squad,target,lessOpp,first) {
    let numHitAtt = 0;
    let numHitDef = 0;
    let numTargsLeft = squad.number-squad.numTarg;
    if (numTargsLeft < 0) {numTargsLeft = 0;}
    let numTargsHere = target.number-target.numOpp+(lessOpp*target.number);
    if (!first && squad.oppSlot < 1) {
        // pour niquer l'anomalie des gobs qui ne remplissent jamais
        numTargsHere = numTargsLeft;
    }
    if (numTargsHere < 0) {numTargsHere = 0;}
    $('#fightDetail').append('<span class="retrait"></span>numTargsHere : '+numTargsHere+'<br>');

    if (numTargsHere >= numTargsLeft) {
        numHitAtt = numTargsLeft;
    } else {
        numHitAtt = numTargsHere;
    }
    if (numHitAtt < 0) {numHitAtt = 0;}
    if (squad.portee == 0) {
        if (target.numTarg+numHitAtt >= target.number) {
            numHitDef = target.number-target.numTarg;
        } else {
            numHitDef = numHitAtt;
        }
    }
    if (numHitDef < 0) {numHitDef = 0;}
    $('#fightDetail').append('<span class="retrait"></span>numHitAtt : <span class="'+squad.color+'">'+numHitAtt+'</span><br>');
    $('#fightDetail').append('<span class="retrait"></span>numHitDef : <span class="'+target.color+'">'+numHitDef+'</span><br>');

    squad.numTarg = squad.numTarg+numHitAtt;
    squad.numOpp = squad.numOpp+Math.round(numHitDef*target.oppSlot);
    target.numTarg = target.numTarg+numHitDef;
    target.numOpp = target.numOpp+Math.round(numHitAtt*squad.oppSlot);

    if (squad.numTarg >= squad.number) {
        squad.targetsOK = true;
    }

    $('#fightDetail').append('<span class="retrait"></span><span class="blanc">'+target.player+' : '+target.number+' '+xType(target.popId,false)+' ('+target.id+') opposants: '+target.numOpp+'</span><br>');
};
