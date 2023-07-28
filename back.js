const express = require('express')
const bodyParser = require("body-parser")
const mysql = require("mysql")
const jose=require('jose')

const app = express()
const jsonParser = bodyParser.json()

var con = mysql.createConnection({
    host: "localhost",
    user: "nodeApp",
    password: "Abcd&123",
    database: "trabaio"
})

con.connect(function (err) {
    if (err) throw err;
    console.log("conectado");
})

app.listen(3001)

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

app.get("/jogos/", function (req, res) {
    var sql = "SELECT*FROM jogos"
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result)
    })
})

app.get("/jogos/:id", function (req, res) {
    var sql = "select*from jogos where id =?"
    var values = [req.params.id]
    con.query(sql, values, function (err, result) {
        if (err) throw err;
        console.log(result);
        if (result.length == 0) {

            res.status(404).send({})
        } else {
            res.send(result)
        }
    })
})

app.post("/jogos/", jsonParser, function (req, res) {
    var sql = "insert into jogos(data, timemandante, timevisitante, placar, local) values(?,?,?,?,?);"
    var values = [req.body.data, req.body.timeMandante, req.body.timeVisitante, req.body.placar, req.body.local]
    con.query(sql, values, function (err, result) {
        if (err) throw err
        const novojogo = {
            id: result.insertId,
            data: req.body.data,
            timeMandante: req.body.timeMandante,
            timeVisitante: req.body.timeVisitante,
            placar: req.body.placar,
            local: req.body.local
        }
        res.send(novojogo)
    })
})

app.put("/jogos/:id", jsonParser, function (req, res) {
    var sql = "update jogos  set data=?, timemandante=?, timevisitante=?, placar=?, local=? where id=?"
    var values = [req.body.data, req.body.timeMandante, req.body.timeVisitante, req.body.placar, req.body.local, req.params.id]
    con.query(sql, values, function (err, result) {
        if (err) throw err
        if (result.affectedRows == 0) {
            res.status(404).send({})
        } else {
            const novojogo = {
                id: result.insertId,
                data: req.body.data,
                timeMandante: req.body.timeMandante,
                timeVisitante: req.body.timeVisitante,
                placar: req.body.placar,
                local: req.body.local
            }
            res.send(novojogo)
        }

    })
})

app.delete("/jogos/:id", jsonParser, function (req, res) {
    var sql = "DELETE from jogos where id=?"
    var values = [req.params.id]
    con.query(sql, values, function (err, result) {
        if (err) throw err
        if (result.affectedRows == 0) {
            res.status(404).send({})
        } else {
            res.status(204).send({})
        }
    })
})