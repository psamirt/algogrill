const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const { Server } = require('socket.io');
const { createServer } = require('http');
const bodyParser = require('body-parser');
require('dotenv').config();
const routes = require('./src/routes/index');
const { PORT } = process.env;

const connectToDatabase = require('./src/database/db');

const server = createServer(app)
const io = new Server(server,{
  cors: {
    origin:'*'
  }
})


app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

io.on('connection', (socket)=>{
  console.log('a user has connected');
  socket.on('productAddedToCart',({ quantity, userId})=>{
    console.log(`Product added with quantity ${quantity}`);
    io.emit(`cartUpdate`,userId);
  })
})

app.use('/', routes);

app.get('/', (req, res) => {
  res.status(200).send('corriendo');
});

connectToDatabase()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to database', error);
  });
