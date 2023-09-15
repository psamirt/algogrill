import express from 'express';
const app = express();
require('./database/db');

const PORT = 3000;

app.get('/product', (req, res) => {
  console.log('Esta corriendo el server');
  res.send('probanding');
});
app.use(require('./routes/productsRouter'));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
