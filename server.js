const express = require('express');
const app = express();
const port = 3000;
const routersApi = require('./routes');

const { logErrors, errorHandler } = require('./middlewares/error.handler');

app.use(express.json()); //Middleware para poder mandar json como respuesta a un post

app.get('/', (req, res)=>{
  res.send('Hola mi server en express');
});

app.get('/nueva_ruta', (req, res)=>{
  res.send('Hola soy una nueva ruta');
});

routersApi(app);

app.use(logErrors);
app.use(errorHandler);

app.listen(port, ()=>{
  console.log('Mi port ' + port);
});