const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let editingTask = null;

addTaskBtn.addEventListener("click", addTask);
window.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  if (editingTask) {
    editingTask.querySelector("span").textContent = taskText;
    editingTask = null;
    addTaskBtn.textContent = "Add";
  } else {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", () => {
      li.classList.toggle("completed", checkbox.checked);
      saveTasks();
    });

    const span = document.createElement("span");
    span.textContent = taskText;

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.addEventListener("click", () => {
      taskInput.value = span.textContent;
      editingTask = li;
      addTaskBtn.textContent = "Update";
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.addEventListener("click", () => {
      li.remove();
      saveTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  }

  taskInput.value = "";
  saveTasks();
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(({ text, completed }) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;
    checkbox.addEventListener("change", () => {
      li.classList.toggle("completed", checkbox.checked);
      saveTasks();
    });

    const span = document.createElement("span");
    span.textContent = text;

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.addEventListener("click", () => {
      taskInput.value = span.textContent;
      editingTask = li;
      addTaskBtn.textContent = "Update";
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.addEventListener("click", () => {
      li.remove();
      saveTasks();
    });

    li.classList.toggle("completed", completed);
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach((li) => {
    const text = li.querySelector("span").textContent;
    const completed = li.classList.contains("completed");
    tasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
