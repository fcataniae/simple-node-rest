const Express = require("express");
const bodyparser = require('body-parser');
const querystring = require('querystring');
const Utils = require('./rabbitmq/utils.js');
const rabbitools = new Utils();
const app = Express();
const fs = require('fs');
const multer  = require('multer');
const __DIR = 'uploads/';
const upload = multer({ dest: __DIR });
rabbitools.channel =  rabbitools.init();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());


app.get('/', function(req, res){
  res.sendFile('views/index.html', {root: __dirname });
});



app.route('/usuario')
  .get(function(req,res){
    let query = req.query.data;
    let query2 = req.query.date;
    console.log('query data  = ' + query + ' querty date = ' + query2);
    res.send('respuesta desde usuario.get');
  })
  .post(upload.single('archivo'),function(req,res){

    let file = fs.readFileSync(__DIR + req.file.filename);
    rabbitools.uploadToQueue("queueExpressJs",file);
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
