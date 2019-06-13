const Express = require("express");
const bodyparser = require('body-parser');
const querystring = require('querystring');
const Utils = require('./rabbitmq/utils.js');
const rabbitools = new Utils();
const app = Express();

rabbitools.channel =  rabbitools.init();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());


app.get('/', function(req, res){
  res.send('consuming main page');
});

app.route('/usuario')
  .get(function(req,res){
    let query = req.query.data;
    let query2 = req.query.date;
    console.log('query data  = ' + query + ' querty date = ' + query2);
    res.send('respuesta desde usuario.get');
  })
  .post(function(req,res){
    console.log(req.body);
    rabbitools.uploadToQueue("queueExpressJs",Buffer.from(JSON.stringify(req.body)));
    res.send('respuesta desde usuario.post');
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
