// require('./src/database/db');
const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config();
const routes = require('./src/routes/productsRouter')
const {PORT} = process.env

const connectToDatabase = require('./src/database/db');

app.use(cors())
app.use(express.json()); 
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); //Autorizo recibir solicitudes de este dominio
  res.header("Access-Control-Allow-Credentials", true); //Autorizo recibir solicitudes que incluyan el encabezado con credenciales
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  ); //Autorizo recibir solicitudes con dichos headers
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE"); //Autorizo las solicitudes tipo GET, POST, OPTIONS, PUT y DELETE.
  next(); // para pasar el control al siguiente middleware
});

app.use('/', routes);

app.get('/', (req,res)=>{
  res.status(200).send('corriendo')
})

connectToDatabase()
.then(()=>{
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((error)=>{
  console.error('Error connecting to database', error)
})

