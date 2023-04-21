const express = require("express");
const cors = require("cors")
const mysql = require("mysql");
const bodyParser = require("body-parser");


const app = express();
app.use(cors());
// Configura body-parser como middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tiendapaypal'
});
const a = (parametro) => {
    if (parametro) {
        console.log(parametro)
        return;
    }
    console.log("Conexión establecida");
}
connection.connect(a);

app.get("/", (req, res) => {
    connection.query("select * from tblproductos", (err, resultado, campos) => {
        if (err) {
            console.log(err);
            let response = {
                error: err
            }
            res.send(JSON.stringify(response));
        }
        res.send(JSON.stringify(resultado))
    })
    //res.send("hola");
})
app.post("/pagar", (req, res) => {
    let total = 0;
    req.body.carrito.map(p => total += p.cantidad * p.precio);

    let consulta = `insert into tblventas (Fecha,Correo,Total,Status) 
    values (now(),?,${total},'pendiente')`;
    let statement = connection.query(consulta,[req.body.email], (err, result) => {
        if (err) throw err;
        console.log('Se insertaron ' + result.affectedRows + ' filas '+result.insertId );
    
    })
    console.log(req.body);

    res.send(JSON.stringify({ "resp": "ok" }));
})


app.listen(3500, () => {
    console.log("Servidor escuchando en 3500")
})