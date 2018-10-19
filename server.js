
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
// charge la carte au démarage du serveur
db.con.connect(function(error) {
    if (error) throw error;
    let sql = "SELECT * FROM world";
    db.con.query(sql, function (error, result) {
        if (error) throw error;
        // RowDataPacket to JSON (is this the right way? - but it works...)
        world = JSON.parse(JSON.stringify(result));
        console.log('map loaded');
    });
    sql = "SELECT * FROM pop";
    db.con.query(sql, function (error, result) {
        if (error) throw error;
        pop = JSON.parse(JSON.stringify(result));
        console.log('units loaded');
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
    });

    // MOVE UNIT
    socket.on('move_unit', function(mvi) {
        // change pop
        objIndex = pop.findIndex((obj => obj.id == mvi.unitId));
        pop[objIndex].tileId = mvi.tileId;
        // change db
        var sql = "UPDATE pop SET tileId = '"+mvi.tileId+"' WHERE id = "+mvi.unitId;
        db.con.query(sql, function (error, result) {
            if (error) throw error;
            // console.log('unit moved');
        });
        // broadcast
        socket.broadcast.emit('unit_moved', mvi);
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
        if (tile.terrain === 'plains') {
            newTerrain = 'forest';
        } else if (tile.terrain === 'forest') {
            newTerrain = 'hills';
        } else if (tile.terrain === 'hills') {
            newTerrain = 'mountains';
        } else if (tile.terrain === 'mountains') {
            newTerrain = 'swamp';
        } else if (tile.terrain === 'swamp') {
            newTerrain = 'plains';
        }
        tile.terrain = newTerrain;
        world[num] = tile;
        // console.log(world);
        socket.emit('mapload', world);
        socket.broadcast.emit('mapload', world);
        // enregister dans la db
        var sql = "UPDATE world SET terrain = '"+newTerrain+"' WHERE id = "+id;
        db.con.query(sql, function (error, result) {
            if (error) throw error;
            console.log('tile changed');
        });
    });

});

server.listen(8080);
