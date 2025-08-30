const http = require("http");
const PORT = 3000;

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  if (req.url === "/") {
    res.statusCode = 200;
    res.end("<h1>Bienvenido al servidor Node.js de Eduardo Bullón 🚀</h1>");
  } else if (req.url === "/about") {
    res.statusCode = 200;
    res.end("<h1>Acerca de</h1><p>Servidor básico creado por Eduardo Bullón, desarrollador de software.</p>");
  } else if (req.url === "/contact") {
    res.statusCode = 200;
    res.end(`
      <h1>Contacto</h1>
      <p>Puedes escribirme a: 
        <a href="mailto:eduardobullonvera@gmail.com">eduardobullonvera@gmail.com</a>
      </p>
    `);
  } else if (req.url === "/services") {
    res.statusCode = 200;
    res.end("<h1>Servicios</h1><ul><li>Desarrollo Web</li><li>APIs REST</li><li>Gestión de Bases de Datos</li></ul>");
  } else if (req.url === "/error") {
    res.statusCode = 500;
    res.end("<h1>500 - Error interno del servidor</h1>");
  } else {
    res.statusCode = 404;
    res.end("<h1>404 - Página no encontrada</h1>");
  }
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
