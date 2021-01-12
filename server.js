const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;
const app = express();
const mysql = require("mysql");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(process.cwd() + "/carSystem/dist/carSystem/"));

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "carSystem"
});


let cars = []

// pull viacle list from data base
app.get('/api/cars', (req, res) => {
    con.query("SELECT * FROM cars", (err, result, fields) => {
        if (err) throw err;
        res.json(result);
    });
});

// search api
app.get('/api/filter', (req, res) => {
    const value = req.query['value'];
    const type = req.query['type'];
    const query = 'SELECT * FROM cars WHERE ' + type + ' = ' + value;
    con.query(query, (err, result, fields) => {
        if (err) throw err;
        res.json(result);
    })
})

// get type list from data base
app.get('/api/types', (req, res) => {
    const query = "SELECT * FROM carType";
    con.query(query, (err, result, fields) => {
        if (err) throw err;
        res.json(result);
    });
})


//delete viacle
app.delete('/api/delete', (req, res) => {
    const carNum = req.query["carNum"];
    const query = "DELETE FROM cars WHERE id = " + carNum;
    con.query(query, (err, result, fields) => {
        if (err) throw err;
        res.json(result);
    })
})

// get employees list from data base
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

// get viacle id
app.get('/api/carId', (req, res) => {
    const query = "SELECT max(id) as id FROM cars";
    con.query(query, (err, result, fields) => {
        if (err) throw err;
        let carIdres = result[0].id;
        res.send(String(carIdres));
    });
});

//get specific licence plate from the database
app.get('/api/licencePlate', (req, res) => {
    const plate = req.query['plate'];
    const query = 'SELECT licencePlate, id FROM cars WHERE licencePlate ="' + plate + '"';
    con.query(query, (err, result, fields) => {
        if (err) throw err;
        let plateRes = "true";
        if (typeof result !== 'undefined' && result.length > 0) {
            if (result[0].id !== parseInt(req.query['id'])) {
                plateRes = "";
            }

        }
        res.send(plateRes);
    })
});

// add viacle to data base
app.post('/api/addCar', (req, res) => {
    const car = req.body;
    const headQuery = "INSERT INTO cars VALUES (";
    const middleQuery = buildQueryValues(car, "insert") + ")";
    const query = headQuery + middleQuery;
    con.query(query, (err, result, fields) => {
        if (err) throw err;
        res.send({ answer: "success" });
    });

});

//update viacle
app.post('/api/updateCar', (req, res) => {
    const car = req.body;
    const headQuery = "UPDATE cars SET ";
    const middleQuery = buildQueryValues(car, "set");
    const cond = "WHERE id = " + car.id;
    const query = headQuery + middleQuery + cond;
    con.query(query, (err, result, fieldes) => {
        if (err) throw err
        res.send({ answer: "edit succesfull" });
    });
});

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + "/carSystem/dist/carSystem/index.html")
});

app.get('/home', (req, res) => {
    res.sendFile(process.cwd() + "/carSystem/dist/carSystem/index.html")
});

// help function for building a query for insert and set
function buildQueryValues(data, type) {
    let query = "";
    if (type === "insert") {
        for (const property in data) {
            if (typeof data[property] === "string") {
                query += "'" + data[property] + "', ";
            }
            else {
                query += data[property] + ", ";
            }
        }
    }
    else {
        for (const property in data) {
            if (typeof data[property] === "string") {
                query += property + " = " + "'" + data[property] + "', ";
            }
            else {
                query += property + "=" + data[property] + ", ";
            }
        }
    }

    return query.slice(0, -2);
}


app.listen(port, () => {
    console.log(`server listen at port:${port}`);
})
