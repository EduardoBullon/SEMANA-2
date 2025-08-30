const http = require("http");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");

const PORT = 3000;


handlebars.registerHelper("ifCond", function (grade, options) {
  if (grade > 15) {
    return options.fn(this); 
  }
  return options.inverse(this); 
});

const server = http.createServer((req, res) => {
  let filePath = "";
  let data = {};

  if (req.url === "/") {
    filePath = path.join(__dirname, "views", "home.hbs");
    data = {
      title: "Servidor con Handlebars 🚀",
      welcomeMessage: "Bienvenido al laboratorio de Node.js",
      day: new Date().toLocaleDateString("es-PE"),
      students: ["Ana", "Luis", "Pedro", "María"],
    };
  } else if (req.url === "/about") {
    filePath = path.join(__dirname, "views", "about.hbs");
    data = {
      course: "Desarrollo de Aplicaciones Web Avanzado",
      teacher: "Ing. Juan Pérez",
      date: new Date().toLocaleDateString("es-PE"),
    };
  } else if (req.url === "/students") {
    filePath = path.join(__dirname, "views", "students.hbs");
    data = {
      students: [
        { name: "Ana", grade: 18 },
        { name: "Luis", grade: 12 },
        { name: "Pedro", grade: 16 },
        { name: "María", grade: 20 },
      ],
    };
  } else {
    res.statusCode = 404;
    res.end("<h1>404 - Página no encontrada</h1>");
    return;
  }

  // Renderizar vista
  fs.readFile(filePath, "utf8", (err, templateData) => {
    if (err) {
      res.statusCode = 500;
      res.end("Error interno del servidor");
      return;
    }

    const template = handlebars.compile(templateData);
    const html = template(data);

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(html);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
