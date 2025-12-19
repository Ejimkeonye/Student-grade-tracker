let students = JSON.parse(localStorage.getItem("studentData")) || [];

const nameInput = document.getElementById("studentName");
const gradeInput = document.getElementById("studentGrade");
const addBtn = document.getElementById("addStudentBtn");
const studentList = document.getElementById("studentList");
const averageDisplay = document.getElementById("averageGrade");

render();

addBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const grade = parseFloat(gradeInput.value);

  if (name === "") {
    alert("Student name cannot be empty!");
    return;
  }
  if (isNaN(grade) || grade < 0 || grade > 100) {
    alert("Please enter a valid grade between 0 and 100.");
    return;
  }

  const newStudent = {
    id: Date.now(), 
    name: name,
    grade: grade,
  };

  students.push(newStudent);
  saveAndRender();

  
  nameInput.value = "";
  gradeInput.value = "";
});


function calculateAverage() {
  if (students.length === 0) return 0;
  const total = students.reduce((sum, s) => sum + s.grade, 0);
  return (total / students.length).toFixed(2);
}

function render() {
  studentList.innerHTML = "";
  const avg = calculateAverage();
  averageDisplay.innerText = avg;

  students.forEach((student) => {
    const row = document.createElement("tr");

    if (student.grade > avg && students.length > 1) {
      row.classList.add("above-average");
    }

    row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.grade}</td>
            <td><button class="delete-btn" onclick="deleteStudent(${student.id})">Delete</button></td>
        `;
    studentList.appendChild(row);
  });
}

window.deleteStudent = function (id) {
  students = students.filter((s) => s.id !== id);
  saveAndRender();
};

function saveAndRender() {
  localStorage.setItem("studentData", JSON.stringify(students));
  render();
}
