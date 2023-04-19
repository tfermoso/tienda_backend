const express = require("express");
const cors=require("cors")
const mysql=require("mysql");

const app = express();
app.use(cors());
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tiendapaypal'
  });
  const a=(parametro)=>{
    if(parametro){
        console.log(parametro)
        return;
    }
    console.log("Conexión establecida");
  }
  connection.connect(a);

app.get("/", (req, res) => {
    connection.query("select * from tblproductos",(err,resultado,campos)=>{
        if(err){
            console.log(err);
            let response={
                error:err
            }
            res.send(JSON.stringify(response));
        }
        res.send(JSON.stringify(resultado))
    })
    //res.send("hola");
})


app.listen(3500, () => {
    console.log("Servidor escuchando en 3500")
})