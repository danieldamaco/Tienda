const express = require('express');
const app = express();
const port = 3000;
const routersApi = require('./routes');
const cors = require('cors');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

app.use(express.json()); //Middleware para poder mandar json como respuesta a un post

//es buena idea darle acceso solo a las apps que lo necesitan
const whitelist = ['http://localhost:8080'];
const options={
  origin: (origin, callback)=>{
    if(whitelist.includes(origin)){
      callback(null, true);
    } else{
      callback(new Error('no permitido'))
    }
  }
}
app.use(cors(options))

app.get('/', (req, res)=>{
  res.send('Hola mi server en express');
});

app.get('/nueva_ruta', (req, res)=>{
  res.send('Hola soy una nueva ruta');
});

routersApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, ()=>{
  console.log('Mi port ' + port);
});