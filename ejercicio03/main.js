const http = require("http");
const url = require("url");
const repo = require("./repository/studentsRepository");

const PORT = process.env.PORT || 4000;


function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", () => resolve(body ? JSON.parse(body) : {}));
    req.on("error", reject);
  });
}

function send(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

function validateRequired(student, isCreate = true) {

  const errors = [];
  const s = student || {};
  const required = ["name", "email", "course", "phone"];
  required.forEach(f => {
    if (isCreate && !s[f]) errors.push(`Campo requerido: ${f}`);
  });
  if (s.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s.email)) errors.push("Email inválido");
  if (s.phone && !/[0-9]/.test(s.phone)) errors.push("Phone debe contener dígitos");
  return errors;
}


const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);
  const { pathname } = parsed;
  const method = req.method;

  
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (method === "OPTIONS") return send(res, 204, {});

 
  if (pathname === "/students" && method === "GET") {
    return send(res, 200, repo.getAll());
  }


  if (pathname.startsWith("/students/") && method === "GET") {
    const id = parseInt(pathname.split("/")[2]);
    const student = repo.getById(id);
    return student ? send(res, 200, student) : send(res, 404, { error: "Estudiante no encontrado" });
  }


  if (pathname === "/students" && method === "POST") {
    const body = await readBody(req);
    const errors = validateRequired(body, true);
    if (errors.length) return send(res, 400, { errors });
    const created = repo.create(body);
    return send(res, 201, created);
  }

  
  if (pathname.startsWith("/students/") && method === "PUT") {
    const id = parseInt(pathname.split("/")[2]);
    const body = await readBody(req);
    const errors = validateRequired(body, false);
    if (errors.length) return send(res, 400, { errors });
    const updated = repo.update(id, body);
    return updated ? send(res, 200, updated) : send(res, 404, { error: "Estudiante no encontrado" });
  }


  if (pathname.startsWith("/students/") && method === "DELETE") {
    const id = parseInt(pathname.split("/")[2]);
    const deleted = repo.remove(id);
    return deleted ? send(res, 200, deleted) : send(res, 404, { error: "Estudiante no encontrado" });
  }

  

  if (pathname === "/students/listByStatus" && method === "POST") {
    const { status } = await readBody(req);
    return send(res, 200, repo.listByStatus(status));
  }

  
  if (pathname === "/students/listByGrade" && method === "POST") {
    const { minGpa } = await readBody(req);
    return send(res, 200, repo.listByGrade(minGpa));
  }

 
  return send(res, 404, { error: "Ruta no encontrada" });
});

server.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}`);
});
