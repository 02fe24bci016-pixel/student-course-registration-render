async function loadCourses() {
  const response = await fetch("/api/courses");
  const courses = await response.json();

  const select = document.getElementById("courseId");
  const coursesDiv = document.getElementById("courses");

  select.innerHTML = '<option value="">-- Select a course --</option>';

  courses.forEach(course => {
    const option = document.createElement("option");
    option.value = course.id;
    option.textContent = `${course.code} - ${course.name} (${course.seats} seats)`;
    select.appendChild(option);
  });

  coursesDiv.innerHTML = courses.map(course => `
    <div class="course">
      <h3>${course.code} - ${course.name}</h3>
      <p>Credits: ${course.credits}</p>
      <p>Available Seats: <strong>${course.seats}</strong></p>
    </div>
  `).join("");
}

async function loadRegistrations() {
  const response = await fetch("/api/registrations");
  const registrations = await response.json();
  const div = document.getElementById("registrations");

  if (registrations.length === 0) {
    div.innerHTML = "<p>No registrations yet.</p>";
    return;
  }

  div.innerHTML = registrations.map(r => `
    <div class="registration">
      <p><strong>${r.studentName}</strong> (${r.studentId})</p>
      <p>${r.courseCode} - ${r.courseName}</p>
      <button class="cancel" onclick="cancelRegistration(${r.id})">
        Cancel Registration
      </button>
    </div>
  `).join("");
}

document.getElementById("registrationForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const studentName = document.getElementById("studentName").value;
  const studentId = document.getElementById("studentId").value;
  const courseId = document.getElementById("courseId").value;
  const message = document.getElementById("message");

  const response = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ studentName, studentId, courseId })
  });

  const data = await response.json();
  message.textContent = data.message;

  if (response.ok) {
    document.getElementById("registrationForm").reset();
    await loadCourses();
    await loadRegistrations();
  }
});

async function cancelRegistration(id) {
  const response = await fetch(`/api/registrations/${id}`, {
    method: "DELETE"
  });

  const data = await response.json();
  document.getElementById("message").textContent = data.message;

  await loadCourses();
  await loadRegistrations();
}

loadCourses();
loadRegistrations();