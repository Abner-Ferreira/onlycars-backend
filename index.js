const express = require("express")
const mysql = require("mysql")
const cors = require("cors")
// const multer = require('multer')
const bodyParser = require('body-parser');

const app = express()
app.use(express.static("./public"))
app.use(express.json())
app.use(cors({ origin: "*" }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// const pool = mysql.createPool({
//     connectionLimit: 10,
//     host: "localhost",
//     user: "root",
//     password: "123456",
//     database: "carros",
//     debug: false
// });

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "123456",
    database: "carros"
})


app.get("/carros", (req, res) => {
    const q = "SELECT * FROM carro"
    db.query(q, (err, data) => {
        if (err) return res.send(err)
        return res.json(data)
    })
})

app.get("/carros/:id", (req, res) => {

    const carId = req.params.id

    const q = "SELECT * FROM carro WHERE idCarro = ?"

    db.query(q, [carId], (err, data) => {
        if (err) return res.send(err)
        return res.json(data)
    })
})





app.post("/carros", (req, res) => {
    const q = "INSERT INTO carro (`nmCarro`, `marcaCarro`, `descCarro`, `precoCarro`, `anoCarro`, `imgCarro`) VALUES (?)"


    const carros = [
        req.body.nmCarro,
        req.body.marcaCarro,
        req.body.descCarro,
        req.body.precoCarro,
        req.body.anoCarro,
        req.body.imgCarro,
    ]



    db.query(q, [carros], (err, data) => {
        if (err) return res.send(err)
        return res.json("Car has been insert successfully")
    })
})


app.put("/carros/:id", (req, res) => {
    const carId = req.params.id

    const q = "UPDATE  carro SET `nmCarro` = ?, `marcaCarro` = ?, `descCarro` = ?, `precoCarro` = ?, `anoCarro`= ? , `imgCarro` = ? WHERE idCarro = ?"

    const carModified = [
        req.body.nmCarro,
        req.body.marcaCarro,
        req.body.descCarro,
        req.body.precoCarro,
        req.body.anoCarro,
        req.body.imgCarro
    ]

    db.query(q, [...carModified, carId], (err, data) => {
        if (err) return res.send(err)
        return res.json("Car has been update successfully")
    })
})

app.delete("/carros/:id", (req, res) => {
    const carId = req.params.id

    const q = "DELETE FROM carro WHERE idCarro = ?"

    db.query(q, [carId], (err, data) => {
        if (err) return res.send(err)
        return res.json("Car has been delete successfully")
    })

})



const port = 8800
app.listen(port, () => {
    console.log("O servidor está rodando na porta 8800")
})

