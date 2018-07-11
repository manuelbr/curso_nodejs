//Módulo
var http = require("http");

var manejador = function(solicitud,respuesta){
  console.log("Recibimos un parámetro");
  respuesta.end("Hola mundo");
};

//Cada vez que se recibe una petición http, se ejecuta la función "manejador".
var servidor = http.createServer(manejador);
servidor.listen(8080);
