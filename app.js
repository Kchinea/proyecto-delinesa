// Importa las dependencias necesarias
const EXPRESS = require('express');
const PATH = require('path');
const CORS = require('cors');  // Importa el paquete CORS

const APP = EXPRESS();

// Configura CORS para permitir solicitudes de cualquier origen
APP.use(CORS()); // Esto permitirá solicitudes de cualquier origen

// Si solo quieres permitir un origen específico, usa algo como:
 /*
APP.use(CORS({
  origin: 'http://tudominiofrontend.com',  // Cambia esto por tu dominio de frontend
}));
*/

APP.set('port', 8081);

// Indica a Express que use la carpeta 'src' para los archivos estáticos
APP.use(EXPRESS.static(PATH.join(__dirname, './src')));

// Escucha las solicitudes en el puerto definido
const SERVER = APP.listen(APP.get('port'), '0.0.0.0', function () {
  console.log('El servidor está corriendo en http://10.6.131.113:' + APP.get('port'));
});
