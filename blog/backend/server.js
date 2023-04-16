const express = require('express')
const app = express()
const jsonParser = express.json();
// const cors = require('cors');
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "markovrv.ru",
    user: "autosalon_d_usr",
    database: "autosalon_daria",
    password: "InndEP7gxgqwk1xY"
});

app.use(express.static(__dirname + "/../frontend/dist"));

connection.connect(function (err) {
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else {
        console.log("Подключение к серверу MySQL успешно установлено");
    }
});

// app.use(cors());

app.get('/api/cars', function (req, res) {
    connection.query("SELECT * FROM cars",
        function (err, results) {
            if (err) {
                console.log(err);
                res.send([]);
            }
            else res.send(results);
        });
})

app.put('/api/cars', jsonParser, function (req, res) {

    const car = [req.body.brand, req.body.model, req.body.year, req.body.color, req.body.price];
    const sql = "INSERT INTO cars (brand, model, year, color, price) VALUES(?, ?, ?, ?, ?)";

    connection.query(sql, car, function (err, results) {
        if (err) res.send("ERROR");
        else res.send(results);
    });
})

app.post('/api/car', jsonParser, function (req, res) {
    const car = [req.body.brand, req.body.model, req.body.year, req.body.color, req.body.price, req.body.id];
    const sql = "UPDATE cars SET brand= ?, model= ?, year= ?, color= ?, price = ? WHERE id = ?;";

    connection.query(sql, car, function (err) {
        if (err) res.send("ERROR");
        else res.send("OK");
    });
})

app.delete('/api/car', function (req, res) {
    let id = req.query.id;
    connection.query("DELETE FROM cars WHERE id="+ Number(id),
        function (err) {
            if (err) {
                console.log(err);                res.send("error");
            }
            else res.send("OK");
        });
})

app.listen(3005, () => { console.log('http://localhost:3003') })
