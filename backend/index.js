const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API działa!');
});

app.listen(5000, () => console.log('Serwer biega na porcie 5000'));