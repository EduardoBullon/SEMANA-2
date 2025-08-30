let students = [
  {
    id: 1,
    name: "Juan Pérez",
    grade: 20,
    age: 23,
    email: "juan.perez@ejemplo.com",
    phone: "+51 987654321",
    enrolmentNumber: "2025001",
    course: "Diseño y Desarrollo de Software C24",
    year: 3,
    subjects: ["Algoritmos", "Bases de Datos", "Redes"],
    gpa: 3.8,
    status: "Activo",
    admissionDate: "2022-03-01"
  },
  {
    id: 2,
    name: "Ana Ruiz",
    grade: 14,
    age: 21,
    email: "ana.ruiz@ejemplo.com",
    phone: "+51 912345678",
    enrolmentNumber: "2025002",
    course: "Diseño y Desarrollo de Software C24",
    year: 2,
    subjects: ["POO", "Cálculo"],
    gpa: 3.1,
    status: "Inactivo",
    admissionDate: "2023-03-01"
  }
];

function nextId() {
  return students.length ? Math.max(...students.map(s => s.id)) + 1 : 1;
}

function getAll() { return students; }
function getById(id) { return students.find(s => s.id === id); }
function create(student) { student.id = nextId(); students.push(student); return student; }
function update(id, updateData) {
  const idx = students.findIndex(s => s.id === id);
  if (idx === -1) return null;
  students[idx] = { ...students[idx], ...updateData, id }; 
  return students[idx];
}
function remove(id) {
  const idx = students.findIndex(s => s.id === id);
  if (idx === -1) return null;
  return students.splice(idx, 1)[0];
}


function listByStatus(status) {
  return students.filter(s => (s.status || "").toLowerCase() === String(status).toLowerCase());
}
function listByGrade(minGpa) {
  const n = Number(minGpa);
  return students.filter(s => Number(s.gpa) >= n);
}

module.exports = { getAll, getById, create, update, remove, listByStatus, listByGrade };
