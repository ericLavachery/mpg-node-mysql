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
    let cType
    let mcRap = 0;
    let fightPopHere = _.filter(pop, function(squad) {
        return (squad.tileId == fightMapId && (squad.player === pseudo || squad.player === fightOpp));
    });
    fightPopHere = _.sortBy(_.sortBy(_.sortBy(_.sortBy(fightPopHere,'number'),'type'),'appui'),'player');
    fightPopHere.reverse().forEach(function(squad) {
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
            cSquad.oldNumber = cSquad.number;
            cSquad.genre = squad.genre;
            cSquad.illu = squad.illu;
            cSquad.attitude = squad.attitude;
            cSquad.hp = squad.hp;
            cSquad.esquiveBase = squad.esquive;
            // avec bonus coverAdj/terCover ?
            cSquad.paradeBase = squad.parade;
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
            cSquad.maxCibles = squad.maxCibles;
            cSquad.moveType = squad.moveType;
            cSquad.move = squad.move;
            cSquad.fatigue = squad.fatigue;
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
            cSquad.HPeach = squad.hp;
            cSquad.HPbat = cSquad.HPeach*cSquad.number;
            cPop.push(cSquad);
            i = i+24;
        }
    });
    cTeamChecks();
    cPopChecks();
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
    cTeams.own.org = calcCombatOrg(cTeams.own.player,cTurn);
    cTeams.opp.org = calcCombatOrg(cTeams.opp.player,cTurn);
    cTeams.own.protection = calcProtection(cTeams.own.org,cTeams.own.aCouvrir,cTeams.own.couvreurs,0,cTeams.own.count,cTeams.opp.count);
    cTeams.opp.protection = calcProtection(cTeams.opp.org,cTeams.opp.aCouvrir,cTeams.opp.couvreurs,0,cTeams.opp.count,cTeams.own.count);
};
function cPopChecks() {
    cPop.forEach(function(squad) {
        squad.shape = squad.shape-fightFatigue(squad.shape,squad.endurance);
        squad.prec = calcShapeEffects(squad.precBase,squad.shape);
        squad.esquive = calcShapeEffects(squad.esquiveBase,squad.shape);
        squad.parade = Math.round((calcShapeEffects(squad.paradeBase,squad.shape)+squad.paradeBase)/2);
        squad.rollChoice = rollChoiceDice(squad.rapChoice);
        squad.pa = calcPA(squad);
        let prioRoll = rand.rand(1,prioDice);
        squad.prioMelee = calcPriority(squad.appui,cTeams[squad.team].protection,squad.pa.power,squad.pa.resist,'melee',prioRoll);
        squad.prioRange = calcPriority(squad.appui,cTeams[squad.team].protection,squad.pa.power,squad.pa.resist,'range',prioRoll);
        squad.prioNone = calcPriority(squad.appui,cTeams[squad.team].protection,squad.pa.power,squad.pa.resist,'none',prioRoll);
        squad.prioAssa = calcPriority(squad.appui,cTeams[squad.team].protection,squad.pa.power,squad.pa.resist,'assa',prioRoll);
        squad.maxOpp = calcMaxOpp(squad.size,cTeams[squad.team].org,0)*squad.number; // 0 is fortification
        squad.oldNumber = squad.number;
        squad.realOpp = 0;
        squad.numOpp = 0;
        squad.numTarg = 0;
        squad.targetsOK = false;
        console.log(squad.type+' p'+squad.pa.power+' r'+squad.pa.resist+' = '+squad.pa.pa+' PA');
    });
    console.log('--------------------');
};
function fightFatigue(shape,endurance) {
    let loss = 0;
    let enduCheck = Math.round((endurance+10)*(endurance+10)/121);
    if (shape <= 20 || endurance >= 100) {
        loss = 0;
    } else {
        if (rand.rand(1,100) > enduCheck) {
            if (endurance <= 50) {
                loss = Math.round((95-endurance)/15);
            } else {
                loss = 3;
            }
        }
    }
    return loss;
};
function pageBottom() {
    // $('html, body').animate({scrollTop:0},600);
    $("html, body").animate({ scrollTop:$(document).height()},600);
};
function fightTurn(turnType) {
    $('html, body').animate({scrollTop:0},600);
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
    cPop.forEach(function(squad) {
        if (squad.HPbat >= 1 && squad.number >= 1) {
            $('#fightDetail').append('<span class="'+squad.color+'">'+squad.player+'</span> : '+squad.number+' '+xType(squad.popId,false)+' ('+squad.id+')<br>');
        }
    });
    $('#fightDetail').append('<br>');
    $('#fightDetail').append('<span class="mauve klik" onclick="pageBottom()">Tour '+cTurn+'</span><br>');
    cpChoice.forEach(function(squad) {
        if (squad.HPbat >= 1 && squad.number >= 1) {
            $('#fightDetail').append('<br>');
            $('#fightDetail').append('<span class="'+squad.color+'">'+squad.player+' : '+squad.number+' '+xType(squad.popId,false)+'</span> ('+squad.id+')<br>');
            $('#fightDetail').append('Fatigue : '+(100-squad.shape)+'<br>');
            $('#fightDetail').append('Cibles requises : '+(squad.number-squad.numTarg)+'<br>');
            if (squad.number-squad.numTarg > 0 && (squad.appui < 3 || squad.portee >= 1)) {
                targetsLoop(squad,true);
            }
            if (squad.number-squad.numTarg > 0 && (squad.appui < 3 || squad.portee >= 1)) {
                $('#fightDetail').append('--------------------<br>');
                $('#fightDetail').append('Cibles requises : '+(squad.number-squad.numTarg)+'<br>');
                targetsLoop(squad,false);
            }
        }
    });
    $('#fightDetail').append('<br>');
    let ownDeads = 0;
    cPop.forEach(function(squad) {
        if (squad.HPbat >= 1 && squad.number >= 1) {
            if (squad.player == pseudo) {
                $('#fightDetail').append('<span class="blanc">'+squad.number+'</span> <span class="'+squad.color+'">'+xType(squad.popId,false)+'</span> ('+squad.id+') cibles: <span class="blanc">'+squad.numTarg+'</span> opposants réels: <span class="vert">'+squad.realOpp+'</span> morts: <span class="rouge">'+(squad.oldNumber-squad.number)+'</span><br>');
                ownDeads = ownDeads+squad.oldNumber-squad.number;
            }
        }
    });
    $('#fightDetail').append('<span class="jaune">'+cTeams.own.player+' : nombre de morts : </span><span class="rouge">'+ownDeads+' &dagger;</span><br>');
    let oppDeads = 0;
    cPop.forEach(function(squad) {
        if (squad.HPbat >= 1 && squad.number >= 1) {
            if (squad.player != pseudo) {
                $('#fightDetail').append('<span class="blanc">'+squad.number+'</span> <span class="'+squad.color+'">'+xType(squad.popId,false)+'</span> ('+squad.id+') cibles: <span class="blanc">'+squad.numTarg+'</span> opposants réels: <span class="vert">'+squad.realOpp+'</span> morts: <span class="rouge">'+(squad.oldNumber-squad.number)+'</span><br>');
                oppDeads = oppDeads+squad.oldNumber-squad.number;
            }
        }
    });
    $('#fightDetail').append('<span class="ciel">'+cTeams.opp.player+' : nombre de morts : </span><span class="rouge">'+oppDeads+' &dagger;</span><br>');
    cTeamChecks();
    cPopChecks();
    $('#fightDetail').append('<br>');
    $('#fightDetail').append('<button onclick="fightTurn(`melee`)" type="button" class="modeButtons" id="nextCombatTurn" title=""><i class="ra ra-crossed-axes"></i>&nbsp; Tour '+(cTurn+1)+' &nbsp;<i class="fas fa-angle-double-right"></i><i class="fas fa-angle-double-right"></i></button><br>');

};
function targetsLoop(squad,first) {
    let cpp = [];
    let prio = 0;
    let lessOpp = 99;
    let relativeOpp = 99;
    if (squad.portee >= 2 || squad.moveType == 'air' || squad.moveType == 'alt') {
        cpp = cppRange;
    } else {
        cpp = cppMelee;
    }
    lessOpp = 99;
    cpp.forEach(function(target) {
        if (target.HPbat >= 1 && target.number >= 1) {
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
        }
    });
    $('#fightDetail').append('Opposants/Unité : '+lessOpp+'<br>');
    cpp.forEach(function(target) {
        if (target.HPbat >= 1 && target.number >= 1) {
            if (target.player != squad.player && squad.number-squad.numTarg > 0) {
                if (squad.portee < 2) {
                    prio = target.prioMelee;
                } else {
                    prio = target.prioRange;
                }
                if (prio > 100 || target.appui == 0) {
                    $('#fightDetail').append('--------------------<br>');
                    $('#fightDetail').append('<span class="retrait"></span>Priorité : '+prio+'<br>');
                    $('#fightDetail').append('<span class="retrait"></span>'+target.player+' : '+target.number+' '+xType(target.popId,false)+' ('+target.id+') opposants: '+target.numOpp+'<br>');
                    relativeOpp = calcRelativeOpp(target);
                    $('#fightDetail').append('<span class="retrait"></span>Opposants/Unité : '+relativeOpp+'<br>');
                    if (!squad.targetsOK && (relativeOpp == lessOpp || !first) && target.numOpp < target.maxOpp) {
                        lockTarget(squad,target,lessOpp,first);
                    }
                }
            }
        }
    });
};
function lockTarget(squad,target,lessOpp,first) {
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
    $('#fightDetail').append('<span class="retrait"></span>Cibles libres : '+numTargsHere+'<br>');

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
    $('#fightDetail').append('<span class="retrait"></span>Attaques : <span class="'+squad.color+'">'+numHitAtt+'</span>&times;'+squad.actions+'<br>');
    $('#fightDetail').append('<span class="retrait"></span>Défenses : <span class="'+target.color+'">'+numHitDef+'</span>&times;'+target.actions+'<br>');

    squad.numTarg = squad.numTarg+numHitAtt;
    squad.numOpp = squad.numOpp+Math.round(numHitDef*target.oppSlot);
    squad.realOpp = squad.realOpp+numHitDef;
    target.numTarg = target.numTarg+numHitDef;
    target.numOpp = target.numOpp+Math.round(numHitAtt*squad.oppSlot);
    target.realOpp = target.realOpp+numHitAtt;

    if (squad.numTarg >= squad.number) {
        squad.targetsOK = true;
    }

    $('#fightDetail').append('<span class="retrait"></span><span class="'+target.color+'">'+target.player+' : '+target.number+' '+xType(target.popId,false)+' ('+target.id+') opposants: '+target.numOpp+'</span><br>');
    hitsOrder(squad,target,numHitAtt,numHitDef);
};
function hitsOrder(squad,target,numHitAtt,numHitDef) {
    let squadHits = squad.actions*numHitAtt;
    let squadHitsLeft = squadHits;
    let squadChance = Math.round(squadHits*(squad.rapidite+rand.rand(1,rapiditeDice))/10);
    let targetHits = target.actions*numHitDef;
    let targetHitsLeft = targetHits;
    let targetChance = Math.round(targetHits*(target.rapidite+rand.rand(1,rapiditeDice))/10);
    let totalHits = squadHits+targetHits;
    let nextHit = 'att';
    let numDead = 0;
    for (i = 1; i <= totalHits; i++) {
        if (squadHitsLeft <= 0) {
            nextHit = 'def';
        } else if (targetHitsLeft <= 0) {
            nextHit = 'att';
        } else {
            if (rand.rand(1,squadChance+targetChance) <= squadChance) {
                nextHit = 'att';
            } else {
                nextHit = 'def';
            }
        }
        numDead = 0;
        if (nextHit == 'att') {
            numDead = blow(squad,target);
            squadHitsLeft = squadHitsLeft-1;
            if (numDead >= 1) {
                // si target mort avant d'avoir frappé, ne frappe pas
                if (rand.rand(1,targetHitsLeft) <= targetHits) {
                    targetHitsLeft = targetHitsLeft-(numDead*target.actions);
                    if (targetHitsLeft >= 0) {
                        i = i+(numDead*target.actions);
                    } else {
                        targetHitsLeft = 0;
                    }
                }
            }
        } else {
            numDead = blow(target,squad);
            targetHitsLeft = targetHitsLeft-1;
            if (numDead >= 1) {
                // si squad mort avant d'avoir frappé, ne frappe pas
                if (rand.rand(1,squadHitsLeft) <= squadHits) {
                    squadHitsLeft = squadHitsLeft-(numDead*squad.actions);
                    if (squadHitsLeft >= 0) {
                        i = i+(numDead*squad.actions);
                    } else {
                        squadHitsLeft = 0;
                    }
                }
            }
        }
    }
};
function blow(hitter,bashed) {
    let numDead = 0;
    let morts = bashed.typeSing+' &dagger;';
    let numberBefore = bashed.number;
    $('#fightDetail').append('<span class="retrait"></span><span class="'+hitter.color+'">'+hitter.typeSing+'</span>');
    let hit = calcHit(hitter.prec,bashed.esquive,bashed.parade,hitter.stature,bashed.stature,hitter.puissance,bashed.hp,hitter.skills,bashed.skills,hitter.degDomaines,bashed.domaine);
    $('#fightDetail').append(' <span title="'+bashed.typeSing+' : '+hit.ep+' '+(100-hit.perc)+'%" class="'+hit.col+'">'+hit.chance+'/'+hit.dice+' &map; '+hit.check+' : '+hit.text+'</span><br>');
    if (hit.res != 'miss') {
        $('#fightDetail').append('<span class="retrait2"></span>');
        let boom = calcDamage(hit.res,hitter.puissance,hitter.penetration,hitter.degNatures,bashed.armure,bashed.nature);
        $('#fightDetail').append('<span title="'+bashed.typeSing+' : armure -'+boom.armorReduct+' dg">'+boom.damageCheck+' dg</span> ');
        if (boom.dnReduct >= 1) {
            $('#fightDetail').append('&map; <span title="'+bashed.typeSing+' : nature -'+boom.dnReduct+' dg">nature</span> ');
        }
        if (boom.damage > bashed.HPeach*hitter.maxCibles) {
            boom.damage = bashed.HPeach*hitter.maxCibles;
            $('#fightDetail').append('max '+bashed.HPeach+'&times;'+hitter.maxCibles+' ');
        }
        bashed.HPbat = bashed.HPbat-boom.damage;
        numDead = numberBefore-(Math.ceil(bashed.HPbat/bashed.HPeach));
        bashed.number = bashed.number-numDead;
        bashed.numTarg = bashed.numTarg-numDead;
        bashed.numOpp = bashed.numOpp-numDead;
        $('#fightDetail').append('&map; <span class="'+hitter.color+'">-'+boom.damage+' hp</span> ');
        if (numDead >= 1) {
            if (numDead >= 2) {
                morts = bashed.type+' &dagger;';
            }
            $('#fightDetail').append('<span class="rouge">'+numDead+' '+morts+'</span>');
        }
        $('#fightDetail').append('<br>');
    }
    return numDead;
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
    } else if (target.number*7 > target.numOpp) {
        relativeOpp = 6;
    } else if (target.number*8 > target.numOpp) {
        relativeOpp = 7;
    } else if (target.number*9 > target.numOpp) {
        relativeOpp = 8;
    } else if (target.number*10 > target.numOpp) {
        relativeOpp = 9;
    } else if (target.number*11 > target.numOpp) {
        relativeOpp = 10;
    } else if (target.number*12 > target.numOpp) {
        relativeOpp = 11;
    } else if (target.number*13 > target.numOpp) {
        relativeOpp = 12;
    } else if (target.number*14 > target.numOpp) {
        relativeOpp = 13;
    } else if (target.number*15 > target.numOpp) {
        relativeOpp = 14;
    } else if (target.number*16 > target.numOpp) {
        relativeOpp = 15;
    }
    return relativeOpp;
};
