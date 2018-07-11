//Módulo para crear el servidor y ponerlo en funcionamiento
var http = require("http");
//Módulo para leer archivos externos.
var fs = require("fs");

//Lectura SÍNCRONA del fichero. Hasta que no se lee por completo, no se ejecuta la siguiente orden de este script.
var html_read_sync = fs.readFileSync("./index.html");

//Lectura ASÍNCRONA del fichero. Como primer parámetro recibe el path del fichero y el segundo es una función callback,
//que se ejecuta después de que se haya leído el fichero.
fs.readFile("./index.html",function(error,html_read_async){

  //El servidor se crea, una vez se ha leído el archivo de forma asíncrona, para evitar recibir peticiones
  //que no se pueden cumplir, porque aún no se haya leído el archivo.
  http.createServer(function(req,res){

    //El parámetro "res" es el que se encarga de mostrar por pantalla la respuesta que queramos,
    //en función de la petición que nos han hecho con el objeto "req".
    res.write(html_read_async);
    res.end();
  }).listen("8080");

});

/* De la siguiente manera, el fichero se leería con cada petición http del navegador y no habría que reiniciar el servidor
  si realizamos cualquier cambio en el fichero html:

  //El servidor se ejecuta en la llamada http y empieza a leer el fichero. Sólo cuando se acabe de leer, se mostrará por pantalla.
  //Mientras tanto, pueden hacerse otras cosas.

  http.createServer(function(req,res){
    fs.readFile("./index.html",function(error,html_read_async){
      res.write(html_read_async);
      res.end();
    });

    //Hacemos otras cosas.
  }).listen("8080");

  */
