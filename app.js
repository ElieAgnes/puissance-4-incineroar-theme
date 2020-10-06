const express = require('express');
const fs = require('fs');

app = express();
app.use(express.static(__dirname));

app.get("*", (req, res) => {
    res.status(200);
    fs.readFile(__dirname + "/index.html", (err, data) => {
      res.end(data);
    });
});