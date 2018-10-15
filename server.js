
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const ent = require('ent'); // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)
const fs = require('fs');
const db = require('./db.js');
const express = require('express');

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
});

// Chargement de la page index.html + autres pages statiques
app.use('/static', express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket, pseudo) {
    // Dès qu'on nous donne un pseudo, on le stocke en variable de session et on informe les autres personnes
    socket.on('newcli', function(pseudo) {
        pseudo = ent.encode(pseudo);
        socket.pseudo = pseudo;
        console.log(world);
        socket.emit('mapload', world);
    });

});

server.listen(8080);
