const Express = require("express");
const bodyParser = require('body-parser');

const app = Express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', function(req, res){
  res.send('consuming main page');
});

app.get('/home', function(req, res){
  res.send('consuming /home page');
});

app.use(function(req, res, next) {
 respuesta = {
  error: true,
  codigo: 404,
  mensaje: 'URL no encontrada'
 };
 res.status(404).send(respuesta);
});


app.listen(3000, () => {
 console.log("El servidor está inicializado en el puerto 3000");
});
