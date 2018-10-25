
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const ent = require('ent'); // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)
const fs = require('fs');
const db = require('./db.js');
const express = require('express');
const numHTiles = 15;

let pop = [];
let world = [];
let ter = [];
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
        console.log('terrains loaded');
    });
});

// pages statiques dossier public/
app.use('/static', express.static(__dirname + '/public'));

// router - ouais, on disait...
app.get('/edit/', function (req, res) {
    res.sendFile(__dirname + '/editor.html');
});
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket, pseudo) {
    // On LOGIN send MAP
    socket.on('newcli', function(pseudo) {
        pseudo = ent.encode(pseudo);
        socket.pseudo = pseudo;
        // console.log(pop);
        socket.emit('mapload', world);
        socket.emit('popload', pop);
        socket.emit('terload', ter);
    });

    // MOVE UNIT
    socket.on('move_unit', function(mvi) {
        // change pop
        objIndex = pop.findIndex((obj => obj.id == mvi.unitId));
        pop[objIndex].tileId = mvi.tileId;
        pop[objIndex].fatigue = mvi.fatigue;
        // change db
        var sql = "UPDATE pop SET tileId = '"+mvi.tileId+"', fatigue = '"+mvi.fatigue+"' WHERE id = "+mvi.unitId;
        db.con.query(sql, function (error, result) {
            if (error) throw error;
            // console.log('unit moved');
        });
        // broadcast
        socket.broadcast.emit('unit_moved', mvi);
    });

    // NEXT TURN
    socket.on('next_turn', function(nti) {
        // change pop
        pop.forEach(function(unit) {
            if (unit.player === nti.pseudo) {
                if (unit.fatigue-unit.move >= 0) {
                    unit.fatigue = unit.fatigue-unit.move;
                } else {
                    unit.fatigue = 0;
                }
            }
        });
        // récup = move
        let sql = "UPDATE pop SET fatigue = fatigue-move WHERE player = '"+nti.pseudo+"' AND fatigue >= 0";
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
        // socket.broadcast.emit('turn_passed', nti);
        console.log(nti.pseudo+' passe au tour suivant');
    });

    // MAP CREATE
    socket.on('add_terrain', function(terrain) {
        let lastTile = world[world.length - 1];
        let y = 0;
        let x = 0;
        let id = lastTile.id + 1;
        if (lastTile.y >= numHTiles) {
            y = 1;
            x = lastTile.x + 1;
        } else {
            y = lastTile.y + 1;
            x = lastTile.x;
        }
        let tile = {id: id, terrain: terrain, x: x, y: y};
        world.push(tile);
        // console.log(world);
        socket.emit('new_tile', tile);
        socket.broadcast.emit('new_tile', tile);
        // enregistrer dans la db
        var sql = "INSERT INTO world (terrain, x, y) VALUES ('" + terrain + "', '" + x + "','" + y + "')";
        db.con.query(sql, function (error, result) {
            if (error) throw error;
            console.log('tile added');
        });
    });

    // MAP EDIT
    socket.on('change_terrain', function(id) {
        let num = id-1;
        let tile = world[num];
        // console.log(tile);
        let newTerrain = 'plains';
        let newTerrainId = 1;
        if (tile.terrain === 'plains') {
            newTerrain = 'forest';
            newTerrainId = 2;
        } else if (tile.terrain === 'forest') {
            newTerrain = 'hills';
            newTerrainId = 3;
        } else if (tile.terrain === 'hills') {
            newTerrain = 'mountains';
            newTerrainId = 4;
        } else if (tile.terrain === 'mountains') {
            newTerrain = 'swamp';
            newTerrainId = 5;
        } else if (tile.terrain === 'swamp') {
            newTerrain = 'plains';
            newTerrainId = 1;
        }
        tile.terrain = newTerrain;
        tile.terrainId = newTerrainId;
        world[num] = tile;
        // console.log(world);
        socket.emit('mapload', world);
        socket.broadcast.emit('mapload', world);
        // enregister dans la db
        var sql = "UPDATE world SET terrain = '"+newTerrain+"', terrainId = '"+newTerrainId+"' WHERE id = "+id;
        db.con.query(sql, function (error, result) {
            if (error) throw error;
            console.log('tile changed');
        });
    });

});

server.listen(8080);
