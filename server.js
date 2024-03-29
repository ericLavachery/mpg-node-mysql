const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const ent = require('ent'); // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)
const fs = require('fs');
const db = require('./modules/dbconnect.js');
const express = require('express');
const isJSON = require('./public/share.js');
const rand = require('./public/share.js');
const _ = require('underscore');

let pop = [];
let world = [];
let ter = [];
let players = [];
let unitTypes = [];
let tracks = [];
let ress = [];
let towns = [];
let skills = [];
let categs = [];
// let unitsImg = fs.readdirSync('./public/img/units/');

// charge la carte au démarage du serveur
db.con.connect(function(error) {
    if (error) throw error;
    let sql = "SELECT * FROM world";
    db.con.query(sql, function (error, result) {
        if (error) throw error;
        // RowDataPacket to JSON (is this the right way? - but it works...)
        world = JSON.parse(JSON.stringify(result));
        console.log('world loaded');
    });
    sql = "SELECT * FROM bataillons";
    db.con.query(sql, function (error, result) {
        if (error) throw error;
        pop = JSON.parse(JSON.stringify(result));
        console.log('pop loaded');
    });
    sql = "SELECT * FROM terrains";
    db.con.query(sql, function (error, result) {
        if (error) throw error;
        ter = JSON.parse(JSON.stringify(result));
        console.log('ter loaded');
    });
    sql = "SELECT * FROM players";
    db.con.query(sql, function (error, result) {
        if (error) throw error;
        players = JSON.parse(JSON.stringify(result));
        console.log('players loaded');
    });
    sql = "SELECT * FROM unites";
    db.con.query(sql, function (error, result) {
        if (error) throw error;
        unitTypes = JSON.parse(JSON.stringify(result));
        console.log('unitTypes loaded');
    });
    sql = "SELECT * FROM tracks";
    db.con.query(sql, function (error, result) {
        if (error) throw error;
        tracks = JSON.parse(JSON.stringify(result));
        console.log('tracks loaded');
    });
    sql = "SELECT * FROM ressources";
    db.con.query(sql, function (error, result) {
        if (error) throw error;
        ress = JSON.parse(JSON.stringify(result));
        console.log('resources loaded');
    });
    sql = "SELECT * FROM villes";
    db.con.query(sql, function (error, result) {
        if (error) throw error;
        towns = JSON.parse(JSON.stringify(result));
        console.log('cities loaded');
    });
    sql = "SELECT * FROM skills";
    db.con.query(sql, function (error, result) {
        if (error) throw error;
        skills = JSON.parse(JSON.stringify(result));
        console.log('skills loaded');
    });
    sql = "SELECT * FROM categories";
    db.con.query(sql, function (error, result) {
        if (error) throw error;
        categs = JSON.parse(JSON.stringify(result));
        console.log('categs loaded');
    });
});

// pages statiques dossier public/
app.use('/static', express.static(__dirname + '/public'));
app.use('/static', express.static(__dirname + '/node_modules/rpg-awesome'));
// app.use('/static', express.static(__dirname + '/node_modules/rpg-awesome/fonts'));

// router - ouais, on disait...
app.get('/tables/', function (req, res) {
    res.sendFile(__dirname + '/tables.html');
});
app.get('/units/', function (req, res) {
    res.sendFile(__dirname + '/units.html');
});
app.get('/fight/', function (req, res) {
    res.sendFile(__dirname + '/fight.html');
});
app.get('/edit/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket, pseudo) {
    // On LOGIN send tables
    socket.on('newcli', function(pseudo) {
        pseudo = ent.encode(pseudo);
        socket.pseudo = pseudo;
        let playerIndex = players.findIndex((obj => obj.pseudo == pseudo));
        let perso = players[playerIndex];
        if (isJSON.isJSON(perso.unitView) && isJSON.isJSON(perso.unitIdent) && isJSON.isJSON(perso.mapCarto) && isJSON.isJSON(perso.mapView) && isJSON.isJSON(perso.exploredTiles) && isJSON.isJSON(perso.enemies) && isJSON.isJSON(perso.allies) && isJSON.isJSON(perso.bldIdent) && isJSON.isJSON(perso.bldView) && isJSON.isJSON(perso.prefs)) {
            perso.unitView = JSON.parse(perso.unitView);
            perso.unitIdent = JSON.parse(perso.unitIdent);
            perso.mapCarto = JSON.parse(perso.mapCarto);
            perso.mapView = JSON.parse(perso.mapView);
            perso.exploredTiles = JSON.parse(perso.exploredTiles);
            perso.enemies = JSON.parse(perso.enemies);
            perso.allies = JSON.parse(perso.allies);
            perso.bldIdent = JSON.parse(perso.bldIdent);
            perso.bldView = JSON.parse(perso.bldView);
            perso.prefs = JSON.parse(perso.prefs);
            console.log('login : '+pseudo);
        } else {
            console.log('re-login : '+pseudo);
        }
        socket.emit('persoload', perso);
        let myTracks = _.filter(tracks, function(track) {
            return (track.player === pseudo);
        });
        socket.emit('tracksload', myTracks);
        socket.emit('cityload', towns);
        socket.emit('terload', ter);
        socket.emit('mapload', world);
        correctPop();
        populatePop();
        socket.emit('popload', pop);
        improveRess();
        socket.emit('ressload', ress);
        socket.emit('fightload', true);
        socket.emit('skillsload', skills);
        socket.emit('categsload', categs);
        socket.emit('unitsCRUDload', unitTypes);
        // socket.emit('unitsimgload', unitsImg);
    });

    function correctPop() {
        // Change type, move et endurance dans la table bataillons si ils ont changé dans la table unitTypes
        let pIndex = 0;
        let uIndex = 0;
        pop.forEach(function(squad) {
            pIndex = players.findIndex((obj => obj.pseudo == squad.player));
            uIndex = unitTypes.findIndex((obj => obj.id == squad.typeId));
            // ATTENTION !!! xxxxxxx ça déconne avec les noms d'unités avec une apostrophe !
            if (squad.type != unitTypes[uIndex].type) {
                let sql = 'UPDATE bataillons SET type = "'+unitTypes[uIndex].type+'" WHERE id = '+squad.id;
                db.con.query(sql, function (error, result) {
                    if (error) throw error;
                    console.log('change to '+squad.type+' : type');
                });
            }
            if (squad.endurance != unitTypes[uIndex].endurance) {
                let sql = "UPDATE bataillons SET endurance = '"+unitTypes[uIndex].endurance+"' WHERE id = "+squad.id;
                db.con.query(sql, function (error, result) {
                    if (error) throw error;
                    console.log('change to '+squad.type+' : endurance');
                });
            }
            if (squad.move != unitTypes[uIndex].move) {
                let sql = "UPDATE bataillons SET move = '"+unitTypes[uIndex].move+"' WHERE id = "+squad.id;
                db.con.query(sql, function (error, result) {
                    if (error) throw error;
                    console.log('change to '+squad.type+' : move');
                });
            }
        });
    };
    function populatePop() {
        let pIndex = 0;
        let uIndex = 0;
        pop.forEach(function(squad) {
            pIndex = players.findIndex((obj => obj.pseudo == squad.player));
            squad.pic = players[pIndex].pic+'.svg';
            uIndex = unitTypes.findIndex((obj => obj.id == squad.typeId));
            Object.keys(unitTypes[uIndex]).forEach(function(key,index) {
                if (key != 'id' && !key.includes('prod_')) {
                    squad[key] = unitTypes[uIndex][key];
                }
            });
        });
        // console.log(pop);
    };
    function improveRess() {
        let resIndex = 0;
        let resCostIndex = 0;
        let resCost = 0;
        ress.forEach(function(ressource) {
            resIndex = ress.findIndex((obj => obj.id == ressource.id));
            // console.log(ressource.name);
            if (ressource.costRes != '') {
                resCostIndex = ress.findIndex((obj => obj.name == ressource.costRes));
                if (ressource.costNum == 0) {
                    resCost = Math.round(ress[resCostIndex].price/10);
                } else {
                    resCost = ressource.costNum*ress[resCostIndex].price;
                }
                ress[resIndex].profit = ressource.price-resCost;
            } else {
                ress[resIndex].profit = ressource.price;
            }
            ress[resIndex].enkval = Math.round(10*ressource.price/ressource.enk);
        });
        // console.log(ress);
    };

    // ANY SINGLE PROPERTY CHANGE
    socket.on('single_any_change', function(data) {
        // console.log(data);
        let recordName = '';
        let prop = data.prop;
        let table = data.table;
        let arr = data.table;
        switch (arr) {
            case 'bataillons':
            let squadIndex = pop.findIndex((obj => obj.id == data.id));
            pop[squadIndex][prop] = data.value;
            recordName = pop[squadIndex].type;
            socket.broadcast.emit('single_pop_changed', data);
            break;
            case 'terrains':
            let terIndex = ter.findIndex((obj => obj.id == data.id));
            ter[terIndex][prop] = data.value;
            recordName = ter[terIndex].name;
            break;
            case 'world':
            let mapIndex = world.findIndex((obj => obj.id == data.id));
            world[mapIndex][prop] = data.value;
            socket.broadcast.emit('single_world_changed', data);
            recordName = world[mapIndex].x+'.'+world[mapIndex].y;
            break;
            case 'ressources':
            let resIndex = ress.findIndex((obj => obj.id == data.id));
            ress[resIndex][prop] = data.value;
            recordName = ress[resIndex].name;
            break;
            case 'unites':
            let unitIndex = unitTypes.findIndex((obj => obj.id == data.id));
            unitTypes[unitIndex][prop] = data.value;
            recordName = unitTypes[unitIndex].type;
            break;
        }
        // change db
        let sql = 'UPDATE '+table+' SET '+prop+' = "'+data.value+'" WHERE id = '+data.id;
        db.con.query(sql, function (error, result) {
            // console.log(result);
            if (error) throw error;
            // console.log(result);
            console.log(recordName+' : '+data.prop+' = '+data.value);
            socket.emit('single_table_change', data);
        });
    });

    // SINGLE PROPERTY POP CHANGE
    socket.on('single_pop_change', function(data) {
        // change pop
        let prop = data.prop;
        let objIndex = pop.findIndex((obj => obj.id == data.id));
        pop[objIndex][prop] = data.value;
        // change db
        let sql = 'UPDATE bataillons SET '+prop+' = "'+data.value+'" WHERE id = '+data.id;
        db.con.query(sql, function (error, result) {
            if (error) throw error;
            console.log(result);
        });
        // broadcast
        socket.broadcast.emit('single_pop_changed', data);
    });

    // SINGLE PROPERTY WORLD CHANGE
    socket.on('single_world_change', function(data) {
        // change world
        let prop = data.prop;
        let objIndex = world.findIndex((obj => obj.id == data.id));
        world[objIndex][prop] = data.value;
        // change db
        let sql = 'UPDATE world SET '+prop+' = "'+data.value+'" WHERE id = '+data.id;
        db.con.query(sql, function (error, result) {
            if (error) throw error;
            console.log(result);
        });
        // broadcast
        socket.broadcast.emit('single_world_changed', data);
    });

    // SINGLE PROPERTY TER CHANGE
    socket.on('single_ter_change', function(data) {
        // change ter
        let prop = data.prop;
        let objIndex = ter.findIndex((obj => obj.id == data.id));
        ter[objIndex][prop] = data.value;
        // change db
        let sql = 'UPDATE terrains SET '+prop+' = "'+data.value+'" WHERE id = '+data.id;
        db.con.query(sql, function (error, result) {
            if (error) throw error;
            console.log(result);
        });
    });

    // SINGLE PROPERTY TRACKS CHANGE
    socket.on('single_tracks_change', function(data) {
        // change db
        let sql = 'UPDATE tracks SET '+data.prop+' = "'+data.value+'" WHERE id = '+data.id;
        db.con.query(sql, function (error, result) {
            if (error) throw error;
            console.log(result);
        });
    });

    // PLAYERS PERSO CHANGE
    socket.on('player_change', function(data) {
        // change pop
        let objIndex = players.findIndex((obj => obj.id == data.id));
        players.splice(objIndex, 1, data);
        // change db
        let bldView = JSON.stringify(data.bldView);
        let bldIdent = JSON.stringify(data.bldIdent);
        let unitView = JSON.stringify(data.unitView);
        let unitIdent = JSON.stringify(data.unitIdent);
        let mapCarto = JSON.stringify(data.mapCarto);
        let mapView = JSON.stringify(data.mapView);
        let exploredTiles = JSON.stringify(data.exploredTiles);
        let prefs = JSON.stringify(data.prefs);
        let sql = "UPDATE players SET prefs = '"+prefs+"', bldView = '"+bldView+"', bldIdent = '"+bldIdent+"', unitView = '"+unitView+"', unitIdent = '"+unitIdent+"', mapView = '"+mapView+"', mapCarto = '"+mapCarto+"', exploredTiles = '"+exploredTiles+"' WHERE id = "+data.id;
        db.con.query(sql, function (error, result) {
            if (error) throw error;
            // console.log(result);
            // console.log('perso updated');
        });
    });

    // MOVE UNIT
    socket.on('move_unit', function(data) {
        // change pop
        objIndex = pop.findIndex((obj => obj.id == data.unitId));
        pop[objIndex].tileId = data.tileId;
        pop[objIndex].fatigue = data.fatigue;
        // change db
        let sql = "UPDATE bataillons SET tileId = '"+data.tileId+"', prevTileId = '"+data.prevTileId+"', fatigue = '"+data.fatigue+"' WHERE id = "+data.unitId;
        db.con.query(sql, function (error, result) {
            if (error) throw error;
            // console.log('unit moved');
        });
        // broadcast
        socket.broadcast.emit('unit_moved', data);
    });

    // GROUP CHANGE
    socket.on('group_change', function(data) {
        // change pop
        objIndex = pop.findIndex((obj => obj.id == data.unitId));
        pop[objIndex].follow = data.groupNumber;
        // change db
        let sql = "UPDATE bataillons SET follow = "+data.groupNumber+" WHERE id = "+data.unitId;
        db.con.query(sql, function (error, result) {
            if (error) throw error;
            // console.log(result);
            // console.log('group change');
        });
    });

    // JOIN UNITS
    socket.on('join_units', function(data) {
        // change pop
        let allIds = ','+data.idsToDelete+',';
        let unitIndex = pop.findIndex((obj => obj.id == data.joinToId));
        pop[unitIndex].fatigue = data.fatigue;
        pop[unitIndex].number = data.totalUnits;
        pop.slice().reverse().forEach(function(unit) {
            if (allIds.includes(","+unit.id+",")) {
                unitIndex = pop.findIndex((obj => obj.id == unit.id));
                pop.splice(unitIndex,1);
            }
        });
        // change db
        let sql = "DELETE from bataillons WHERE id IN ("+data.idsToDelete+")";
        db.con.query(sql, function (error, result) {
            if (error) throw error;
            console.log('units deleted');
            // console.log(result);
        });
        sql = "UPDATE bataillons SET number = '"+data.totalUnits+"', fatigue = '"+data.fatigue+"' WHERE id = "+data.joinToId;
        db.con.query(sql, function (error, result) {
            if (error) throw error;
            console.log('units joined');
            // console.log(result);
        });
        // broadcast
        socket.broadcast.emit('units_joined', data);
    });

    // SPLIT UNIT
    socket.on('split_unit', function(data) {
        console.log('split required');
        // change db
        let unitIndex = pop.findIndex((obj => obj.id == data.splitedUnitId));
        let newUnit = JSON.parse(JSON.stringify(pop[unitIndex]));
        newUnit.number = Number(data.splitValue);
        // retire de newUnit tous les champs importés de unitTypes
        delete newUnit.id;
        delete newUnit.pic;
        Object.keys(unitTypes[0]).forEach(function(key,index) {
            if (key != 'id' && key != 'type' && key != 'move' && key != 'endurance') {
                delete newUnit[key];
            }
        });
        let sql = "INSERT INTO bataillons SET ?";
        db.con.query(sql, newUnit, function (error, result) {
            if (error) throw error;
            // result.insertId is the id given by mysql to the last inserted record (by this client)
            console.log('unit added');
            // console.log(result);
            splitOnServerPop(data,result.insertId);
        });
        let splitedUnitNumber = pop[unitIndex].number-data.splitValue;
        sql = "UPDATE bataillons SET number = '"+splitedUnitNumber+"' WHERE id = "+data.splitedUnitId;
        db.con.query(sql, function (error, result) {
            if (error) throw error;
            console.log('unit splitted');
            // console.log(result);
        });
        function splitOnServerPop(data,newId) {
            newUnit.id = newId;
            newUnit.number = Number(newUnit.number);
            pop.push(newUnit);
            let unitIndex = pop.findIndex((obj => obj.id == data.splitedUnitId));
            pop[unitIndex].number = pop[unitIndex].number-data.splitValue;
            // broadcast (for player and all others)
            socket.emit('my_unit_splited', {splitedUnitId: data.splitedUnitId, splitValue: data.splitValue, newId: newId});
            socket.broadcast.emit('unit_splited', {splitedUnitId: data.splitedUnitId, splitValue: data.splitValue, newId: newId});
        }
    });

    // ADD TRACK
    socket.on('add_track', function(data) {
        let newTrack = data;
        // change db
        let sql = "INSERT INTO tracks SET ?";
        db.con.query(sql, data, function (error, result) {
            if (error) throw error;
            // result.insertId is the id given by mysql to the last inserted record (by this client)
            sendNewTrack(result.insertId);
        });
        function sendNewTrack(newId) {
            newTrack.id = newId;
            tracks.push(newTrack);
            socket.emit('track_added', newTrack);
        }
    });

    // ADD RESSOURCE
    socket.on('add_res', function(data) {
        let newRes = data;
        // change db
        let sql = "INSERT INTO ressources SET ?";
        db.con.query(sql, data, function (error, result) {
            if (error) throw error;
            // result.insertId is the id given by mysql to the last inserted record (by this client)
            console.log('new res '+data.name+' added');
            sendNewRes(result.insertId);
        });
        function sendNewRes(newId) {
            newRes.id = newId;
            ress.push(newRes);
            improveRess();
            socket.emit('ressload', ress);
        }
    });

    // NEXT TURN
    socket.on('next_turn', function(data) {
        // change pop
        let ownPop = _.filter(pop, function(unit) {
            return (unit.player === data.pseudo);
        });
        ownPop.forEach(function(unit) {
            if (unit.fatigue+unit.endurance-unit.move >= 0) {
                unit.fatigue = unit.fatigue-unit.move;
            } else {
                unit.fatigue = 0-unit.endurance;
            }
            unit.time = 1;
        });
        // récup = move
        let sql = "UPDATE bataillons SET fatigue = fatigue-move, time = 1 WHERE player = '"+data.pseudo+"' AND fatigue+endurance >= 0";
        db.con.query(sql, function (error, result) {
            if (error) throw error;
            // console.log('turn passed');
            console.log(result);
        });
        // fatigue+endurance non négative
        sql = "UPDATE bataillons SET fatigue = 0-endurance WHERE fatigue+endurance < 0";
        db.con.query(sql, function (error, result) {
            if (error) throw error;
            // console.log('turn passed');
            console.log(result);
        });
        // broadcast: no need?
        // socket.broadcast.emit('turn_passed', data);
        console.log(data.pseudo+' passe au tour suivant');
    });

});

server.listen(8080);
