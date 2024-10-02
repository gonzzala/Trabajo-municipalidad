require('dotenv').config(); 
const express = require('express');
const routes = require('./routes');
jwt = require('jsonwebtoken');
token = require('./config/token');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 4000;
const host = '0.0.0.0';

app.set('key', token.key);
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => { res.send('¡Hola, mundo!');});
routes(app);

// Ejemplo de consulta a la base de datos
/* app.get('/usuarios', (req, res) => {
  const sql = 'SELECT * FROM usuarios';

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al realizar la consulta: ' + err.message);
      res.status(500).send('Error en la consulta a la base de datos');
    } else {
      res.json(result);
    }
  });
}); */

app.listen(port, host, () => {
  console.log(`Servidor Node.js en ejecución en http://${host}:${port}`);
});

