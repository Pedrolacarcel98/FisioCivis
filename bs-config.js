const fs = require('fs');
const path = require('path');

module.exports = {
  server: {
    baseDir: "./",
    middleware: [
      function (req, res, next) {
        let url = req.url;
        
        // Si la URL termina en / y no es la raíz, intentamos mapear a .html
        if (url.length > 1 && url.endsWith('/')) {
          // Eliminamos la barra final y la barra inicial para comprobar el archivo
          let cleanPath = url.substring(1, url.length - 1);
          let filePath = path.join(__dirname, cleanPath + '.html');
          
          if (fs.existsSync(filePath)) {
            // Internamente servimos el archivo .html sin cambiar la URL del navegador
            req.url = '/' + cleanPath + '.html';
          }
        }
        next();
      }
    ]
  },
  files: ["*.html", "css/*.css", "js/*.js", "partials/*.html"],
  port: 3000,
  open: true,
  notify: false,
  ghostMode: false
};
