addEventListener("DOMContentLoaded", function () {
  let Task = document.getElementById("task-input");
  let add_btn = document.getElementById("task-btn");
  let task_list = document.getElementById("task-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Array to hold tasks

  tasks.forEach((task) => {
    const add_task = document.createElement("li"); // Create a new list item
    add_task.innerHTML = `
            <div class="task">
                <input type="checkbox" class="task-status">
                <p class="task-value">${task}</p>
                <button type="button" class="delete">Delete</button>
            </div>
        `;

    task_list.appendChild(add_task); // Append the new task to the task list
  });

  add_btn.addEventListener("click", function () {
    let task = Task.value.trim(); // Get the trimmed value of the task
    if (task === "") {
      alert("Please enter a task");
    } else if (tasks.includes(task)) {
      alert("This task already exists!"); // Alert if the task already exists
    } else {
      tasks.push(task); // Add task to array
      savetasks(tasks);

      const add_task = document.createElement("li"); // Create a new list item
      add_task.innerHTML = `
            <div class="task">
                <input type="checkbox" class="task-status" onclick="task_status(this)">
                <p class="task-value">${task}</p>
                <button type="button" class="delete">Delete</button>
            </div>
        `;

      task_list.appendChild(add_task); // Append the new task to the task list
      Task.value = ""; // Clear the input field
    }
  });

  task_list.addEventListener("click", function (e) {
    if (
      e.target.tagName === "BUTTON" &&
      e.target.classList.contains("delete")
    ) {
      let task =
        e.target.parentElement.querySelector(".task-value").textContent;
      let index = tasks.indexOf(task);
      if (index > -1) {
        tasks.splice(index, 1);
        e.target.parentElement.remove();
        savetasks(tasks);
      }
    }
  });
});

// Function to toggle task status (completed or not)
function task_status(checkbox) {
    // Get the parent task item (li element)
    const taskItem = checkbox.parentElement;

    // Check if the checkbox is checked
    if (checkbox.checked) {
 
        taskItem.querySelector('.task-value').style.textDecoration = "line-through";
    } else {
        // Remove the "line-through" if unchecked
        taskItem.querySelector('.task-value').style.textDecoration = "none";
    }
}


function savetasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
