const express = require('express');
const app = express();

console.log("[index.js] CIAO BRUNO!");

app.get('/', (req, res) => res.send('👋 Benvenuto dal backend!'));

app.listen(3000, () => console.log('Backend in ascolto sulla porta 3000'));
