const express = require('express') //Framework Node.JS de serv Web installe par gestionnaire de packet npm (qui demarre le site)
const fs = require('fs') //Librairie permettant de manipuler les fichier
const https = require('https')
let app = express() //Creer l'objet de librairie (like Discord)

app.use(express.static(__dirname + "/public"));//Rend le dossier accessible par le site

app.get("/", function (req, res) {//Definie la page d'arrivee
    fs.readFile('index.html', (err, data) => {
        res.end(data);
    });
});

https.createServer({ //Creer un serveur https
    key: fs.readFileSync('/etc/letsencrypt/live/cet1bot.app/privkey.pem', 'utf8'), //Charge les certifcats https
    cert: fs.readFileSync('/etc/letsencrypt/live/cet1bot.app/cert.pem', 'utf8'), //Charge les certifcats https
    ca: fs.readFileSync('/etc/letsencrypt/live/cet1bot.app/fullchain.pem', 'utf8') //Charge les certifcats https
}, app)
    .listen(443, function () {//Definir le port + lance la fonction si samarch
        console.log('Web server run on : https://cet1bot.app/')
    })
