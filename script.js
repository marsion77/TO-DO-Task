let editIndex = null;

document.getElementById("mybtn").addEventListener("click", submitForm);

function submitForm(event) {
  event.preventDefault();

  const taskInput = document.getElementById("my-tasks");
  const errorTag = document.getElementById("regextag");
  const taskValue = taskInput.value.trim();

  errorTag.innerHTML = "";

  if (taskValue === "") {
    errorTag.innerHTML = "Please enter a task!";
    return;
  }

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  if (editIndex === null) {
    tasks.push(taskValue);
    alert("Task added successfully!");
  } else {
    tasks[editIndex] = taskValue;
    editIndex = null;
    document.getElementById("mybtn").textContent = "Submit";
    alert("Task updated successfully!");
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
  taskInput.value = "";
}

function displayTasks() {
  const taskList = document.getElementById("all-tasks");
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${task} 
      <div class='li-con'>
      <button class="edit-btn" onclick="editTask(${index})">Edit</button> 
      <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

function editTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    const updatedTask = prompt("Edit your task:", tasks[index]);

    if (updatedTask !== null && updatedTask.trim() !== "") {
        tasks[index] = updatedTask.trim();
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks(); 
    }
}


function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}

window.onload = displayTasks;
