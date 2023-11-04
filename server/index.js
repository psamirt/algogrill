import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { createServer } from 'http';
import { Server } from 'socket.io';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './src/routes/index.js';
import connectToDatabase from './src/database/db.js';

// Configurar variables de entorno desde el archivo .env
dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

// Configurar middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

// Configurar rutas
app.use('/', routes);

// Configurar Socket.IO
io.on('connection', (socket) => {
  console.log('a user has connected');
  socket.on('productAddedToCart', ({ quantity, userId }) => {
    console.log(`Product added with quantity ${quantity}`);
    io.emit(`cartUpdate`, userId);
  });
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.status(200).send('corriendo');
});

// Conectar a la base de datos y arrancar el servidor
const { PORT } = process.env;

connectToDatabase()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to database', error);
  });
