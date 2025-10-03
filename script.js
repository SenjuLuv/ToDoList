"use strict";
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const input = document.getElementById("myInput");
  const taskName = input.value.trim();

  if (taskName === "") return;

  const li = document.createElement("li");
  li.textContent = taskName;

  const delButton = document.createElement("button");
  delButton.className = "del-button";
  delButton.textContent = "Delete";
  delButton.onclick = () => deleteTask(li);

  const edButton = document.createElement("button");
  edButton.className = "ed-button";
  edButton.textContent = "Edit";
  edButton.onclick = () => editTask(li);

  li.appendChild(delButton);
  li.appendChild(edButton);
  document.getElementById("myUL").appendChild(li);

  input.value = "";
  saveTasks();
}

function deleteTask(task) {
  task.remove();
  saveTasks();
}

function editTask(task) {
  const newTaskName = prompt("Edit task:", task.childNodes[0].textContent);
  if (newTaskName !== null && newTaskName.trim() !== "") {
    task.childNodes[0].textContent = newTaskName.trim();
    saveTasks();
  }
}

function saveTasks() {
  const tasks = [];
  const taskList = document.getElementById("myUL").children;

  for (let task of taskList) {
    tasks.push(task.childNodes[0].textContent);
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    const tasks = JSON.parse(savedTasks);
    tasks.forEach((taskName) => {
      const li = document.createElement("li");
      li.textContent = taskName;

      const delButton = document.createElement("button");
      delButton.className = "del-button";
      delButton.textContent = "Delete";
      delButton.onclick = () => deleteTask(li);

      const edButton = document.createElement("button");
      edButton.className = "ed-button";
      edButton.textContent = "Edit";
      edButton.onclick = () => editTask(li);

      li.appendChild(delButton);
      li.appendChild(edButton);
      document.getElementById("myUL").appendChild(li);
    });
  }
}
