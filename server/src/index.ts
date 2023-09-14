import express from 'express';
const app = express();
require('./database/db')
app.use(express.json());

const PORT = 3000;

app.get('/product', (_req, res) => {
  console.log('Esta corriendo el server');
  res.send('probanding');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
