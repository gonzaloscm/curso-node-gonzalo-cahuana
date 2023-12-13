const fs = require('fs');

function leerArchivoCallback(archivo, callback) {
  fs.readFile(archivo, 'utf-8', (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
}

function convertirAMayusculasPromesa(contenido) {
  return new Promise((resolve, reject) => {
    if (typeof contenido === 'string') {
      resolve(contenido.toUpperCase());
    } else {
      reject(new Error('El contenido no es una cadena de texto.'));
    }
  });
}

function realizarTareas(archivo) {
  return new Promise((resolve, reject) => {

    leerArchivoCallback(archivo, (err, data) => {
      if (err) {
        reject(err);
      } else {

        convertirAMayusculasPromesa(data)
          .then((resultado) => {
            resolve(resultado);
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  });
}


const archivo = 'datos.txt';

realizarTareas(archivo)
  .then((resultadoFinal) => {
    console.log('Resultado final:', resultadoFinal);
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });