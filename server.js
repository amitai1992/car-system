const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;
const app = express();
const mysql = require("mysql");


app.use(bodyParser.urlencoded({ extended: true }));

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "carSystem"
});


let cars = []

app.get('/api/cars', (req, res) => {
    con.query("SELECT * FROM cars", (err, result, fields) => {
        if (err) throw err;
        res.json(result);
    });
});

app.get('/api/types', (req, res) => {
    const query = "SELECT * FROM carType";
    con.query(query, (err, result, fields) => {
        if (err) throw err;
        res.json(result);
    });
})


app.delete('/api/delete', (req, res) => {
    const carNum = req.param("carNum");
    const query = "DELETE FROM cars WHERE id = " + carNum;
    con.query(query, (err, result, fields) => {
        if (err) throw err;
        res.json(result);
    })
})

app.get('/api/employee', (req, res) => {
    const query = "SELECT employeeNum FROM employee"
    con.query(query, (err, result, fields) => {
        if (err) throw err;
        let tempNums = [];
        result.forEach(id => {
            tempNums.push(id.employeeNum);
        });
        res.send(tempNums);
    })
})

app.get('/api/carId', (req, res) => {
    const query = "SELECT max(id) as id FROM cars";
    con.query(query, (err, result, fields) => {
        if (err) throw err;
        let carIdres = result[0].id;
        res.send(String(carIdres));
    });
})

app.get('/', (req, res) => {
    res.send('App Works !!!!');
});

app.listen(port, () => {
    console.log(`server listen at port:${port}`);
})
