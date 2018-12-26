
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

const numHTiles = 15;
const numVTiles = 8;

let pop = [];
let world = [];
let ter = [];
let players = [];
let unitTypes = [];
let tracks = [];
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
    sql = "SELECT * FROM pop";
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
    sql = "SELECT * FROM unitTypes";
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
});

// pages statiques dossier public/
app.use('/static', express.static(__dirname + '/public'));

// router - ouais, on disait...
app.get('/terrains/', function (req, res) {
    res.sendFile(__dirname + '/terrains.html');
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
        if (isJSON.isJSON(perso.unitView) && isJSON.isJSON(perso.unitIdent) && isJSON.isJSON(perso.mapCarto) && isJSON.isJSON(perso.mapView) && isJSON.isJSON(perso.exploredTiles) && isJSON.isJSON(perso.enemies) && isJSON.isJSON(perso.allies) && isJSON.isJSON(perso.bldIdent) && isJSON.isJSON(perso.bldView)) {
            perso.unitView = JSON.parse(perso.unitView);
            perso.unitIdent = JSON.parse(perso.unitIdent);
            perso.mapCarto = JSON.parse(perso.mapCarto);
            perso.mapView = JSON.parse(perso.mapView);
            perso.exploredTiles = JSON.parse(perso.exploredTiles);
            perso.enemies = JSON.parse(perso.enemies);
            perso.allies = JSON.parse(perso.allies);
            perso.bldIdent = JSON.parse(perso.bldIdent);
            perso.bldView = JSON.parse(perso.bldView);
            console.log('login : '+pseudo);
        } else {
            console.log('re-login : '+pseudo);
        }
        socket.emit('persoload', perso);
        let myTracks = _.filter(tracks, function(track) {
            return (track.player === pseudo);
        });
        socket.emit('tracksload', myTracks);
        socket.emit('terload', ter);
        socket.emit('mapload', world);
        // socket.emit('terload', ter);
        populatePop();
        socket.emit('popload', pop);
    });

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

    // SINGLE PROPERTY POP CHANGE
    socket.on('single_pop_change', function(data) {
        // change pop
        let prop = data.prop;
        let objIndex = pop.findIndex((obj => obj.id == data.id));
        pop[objIndex].prop = data.value;
        // change db
        let sql = "UPDATE pop SET "+prop+" = '"+data.value+"' WHERE id = "+data.id;
        db.con.query(sql, function (error, result) {
            if (error) throw error;
            // console.log('single pop changed');
        });
        // broadcast
        socket.broadcast.emit('single_pop_changed', data);
    });

    // SINGLE PROPERTY WORLD CHANGE
    socket.on('single_world_change', function(data) {
        // change world
        let prop = data.prop;
        let objIndex = world.findIndex((obj => obj.id == data.id));
        world[objIndex].prop = data.value;
        // change db
        let sql = "UPDATE world SET "+prop+" = '"+data.value+"' WHERE id = "+data.id;
        db.con.query(sql, function (error, result) {
            if (error) throw error;
            // console.log('single world changed');
        });
        // broadcast
        socket.broadcast.emit('single_world_changed', data);
    });

    // SINGLE PROPERTY TRACKS CHANGE
    socket.on('single_tracks_change', function(data) {
        // change db
        let sql = "UPDATE tracks SET "+data.prop+" = '"+data.value+"' WHERE id = "+data.id;
        db.con.query(sql, function (error, result) {
            if (error) throw error;
            // console.log('single tracks changed');
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
        let sql = "UPDATE players SET bldView = '"+bldView+"', bldIdent = '"+bldIdent+"', unitView = '"+unitView+"', unitIdent = '"+unitIdent+"', mapView = '"+mapView+"', mapCarto = '"+mapCarto+"', exploredTiles = '"+exploredTiles+"' WHERE id = "+data.id;
        db.con.query(sql, function (error, result) {
            if (error) throw error;
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
        let sql = "UPDATE pop SET tileId = '"+data.tileId+"', prevTileId = '"+data.prevTileId+"', fatigue = '"+data.fatigue+"' WHERE id = "+data.unitId;
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
        let sql = "UPDATE pop SET follow = "+data.groupNumber+" WHERE id = "+data.unitId;
        db.con.query(sql, function (error, result) {
            if (error) throw error;
            console.log('group change');
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
        let sql = "DELETE from pop WHERE id IN ("+data.idsToDelete+")";
        db.con.query(sql, function (error, result) {
            if (error) throw error;
            console.log('units deleted');
        });
        sql = "UPDATE pop SET number = '"+data.totalUnits+"', fatigue = '"+data.fatigue+"' WHERE id = "+data.joinToId;
        db.con.query(sql, function (error, result) {
            if (error) throw error;
            console.log('units joined');
        });
        // broadcast
        socket.broadcast.emit('units_joined', data);
    });

    // SPLIT UNIT
    socket.on('split_unit', function(data) {
        // change db
        let unitIndex = pop.findIndex((obj => obj.id == data.splitedUnitId));
        let newUnit = JSON.parse(JSON.stringify(pop[unitIndex]));
        newUnit.number = Number(data.splitValue);
        // retire de newUnit tous les champs importés de unitTypes
        delete newUnit.id;
        delete newUnit.pic;
        Object.keys(unitTypes[0]).forEach(function(key,index) {
            if (key != 'id' && key != 'type' && key != 'move') {
                delete newUnit[key];
            }
        });
        let sql = "INSERT INTO pop SET ?";
        db.con.query(sql, newUnit, function (error, result) {
            if (error) throw error;
            // result.insertId is the id given by mysql to the last inserted record (by this client)
            splitOnServerPop(data,result.insertId);
        });
        let splitedUnitNumber = pop[unitIndex].number-data.splitValue;
        sql = "UPDATE pop SET number = '"+splitedUnitNumber+"' WHERE id = "+data.splitedUnitId;
        db.con.query(sql, function (error, result) {
            if (error) throw error;
            console.log('unit splited');
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

    // NEXT TURN
    socket.on('next_turn', function(data) {
        // change pop
        pop.forEach(function(unit) {
            if (unit.player === data.pseudo) {
                if (unit.fatigue-unit.move >= 0) {
                    unit.fatigue = unit.fatigue-unit.move;
                } else {
                    unit.fatigue = 0;
                }
            }
        });
        // récup = move
        let sql = "UPDATE pop SET fatigue = fatigue-move WHERE player = '"+data.pseudo+"' AND fatigue >= 0";
        db.con.query(sql, function (error, result) {
            if (error) throw error;
            // console.log('turn passed');
        });
        // fatigue non négative
        sql = "UPDATE pop SET fatigue = 0 WHERE fatigue < 0";
        db.con.query(sql, function (error, result) {
            if (error) throw error;
            // console.log('turn passed');
        });
        // broadcast: no need?
        // socket.broadcast.emit('turn_passed', data);
        console.log(data.pseudo+' passe au tour suivant');
    });

});

server.listen(8080);
