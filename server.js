const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;
const app = express();
const mysql = require("mysql");

app.use(bodyParser.json());
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
});

app.get('/api/licencePlate', (req, res) => {
    const plate = req.param("plate");
    const query = 'SELECT licencePlate FROM cars WHERE licencePlate ="' + plate + '"';
    con.query(query, (err, result, fields) => {
        if (err) throw err;
        let plateRes = "true";
        if (typeof result !== 'undefined' && result.length > 0) {
            plateRes = "";
        }
        res.send(plateRes);
    })
});

app.post('/api/addCar', (req, res) => {
    const car = req.body;
    const headQuery = "INSERT INTO cars VALUES (";
    const middleQuery = car.id + ", " + "'" +car.licencePlate+"'" + ", " + car.viacleType
    + ", " + Boolean(car.fourOnFour) + ", " + car.engineCapacity + ", " + car.manufactoryYear
    + ", " + car.comments + ", " + car.deliveredToEmployee + ", " + "'" + car.treatmentDate
    + "'" + ", " + "'" + car.editDate + "'" + ")";
    const query = headQuery + middleQuery;
    con.query(query, (err, result, fields) => {
        if(err) throw err;
        res.send({answer : "success"});  
    })
    
})

app.get('/', (req, res) => {
    res.send('App Works !!!!');
});

app.listen(port, () => {
    console.log(`server listen at port:${port}`);
})
