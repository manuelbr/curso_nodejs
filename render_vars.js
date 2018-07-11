
var http = require("http");
//Módulo para leer archivos externos.
var fs = require("fs");

http.createServer(function(req,res){
  fs.readFile("./index.html",function(error,html_read_async){
    //Pasamos a string el objeto html_read_async, puesto que es el resultado de leer el fichero y ese objeto resulta ser de tipo binario.
    var html_string = html_read_async.toString();

    var nombre = "Manuel";

    //Obtenemos las variables (de forma bruta, esto se supone que con los frameworks que se trabajen en el futuro, ya estará hecho
    // y estará en una capa por debajo de donde trabajaremos) con una expresión regular y el match, para ver dónde están las variables
    //en la plantilla del html que hemos leído.
    var vars = html_string.match(/[^\{\}]+(?=\})/g);

    for(var i = (vars.length - 1 ); i>=0; i--){
      //Esto es funcionalidad de javascript: La función eval toma como parámetro un string y lo trata como si fuera
      //código javascript. Lo siguiente, convierte el string nombre a la variable nombre, que son dos cosas diferentes.

      var nombre_var = eval(vars[i]);

      html_string = html_string.replace("{"+vars[i]+"}", nombre_var);
    }

    res.write(html_string);
    res.end();
  });

  //Hacemos otras cosas.
}).listen("8080");
