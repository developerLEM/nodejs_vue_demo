const express = require('express');
const app = express();

console.log("------------------------------");
console.log("[index.js] CIAO BRUNO!");
console.log("------------------------------");

app.get('/', (req, res) => {
  console.log(`📥 [index.js] Richiesta ricevuta da ${req.ip} al ${new Date().toISOString()}`);
  res.send(`👋 Benvenuto dal backend! Il tuo IP è : ${req.ip}`);
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 [index.js] Backend in ascolto su http://localhost:${PORT} (${new Date().toLocaleString()})`);
});
