document.addEventListener("DOMContentLoaded", function () {
    // Load tasks from localStorage when the page loads
    loadTasks();


    document.getElementById("new-task-form").addEventListener("submit", function (event) {
        event.preventDefault();

        var taskText = document.getElementById("new-task-input").value;

        if (taskText.trim() !== "") {
            createTask(taskText);
            document.getElementById("new-task-input").value = "";
            saveTasks(); // Save tasks to localStorage after adding a new task
        }
    });

    function createTask(text) {
        var tasksContainer = document.getElementById("tasks");

        var taskElement = document.createElement("div");
        taskElement.className = "task";
        taskElement.innerHTML = `
            <div class="content">
                <input type="text" class="text" value="${text}" readonly/>
            </div>
            <div class="actions">
                <button class="edit"><i class="fas fa-edit"></i></button>
                <button class="delete"><i class="fas fa-trash-alt"></i></button>
                <button class="complete"><i class="fas fa-check"></i></button>
            </div>
        `;

        taskElement.querySelector(".delete").addEventListener("click", function () {
            taskElement.remove();
            saveTasks(); // Save tasks to localStorage after deleting a task
        });

        taskElement.querySelector(".edit").addEventListener("click", function () {
            toggleEditSave(taskElement); // Switch between Edit and Save
            saveTasks(); // Save tasks to localStorage after editing a task
        });

        taskElement.querySelector(".complete").addEventListener("click", function () {
            completeTask(taskElement); // Mark task as complete
            saveTasks(); // Save tasks to localStorage after completing a task
        });

        taskElement.addEventListener("click", function () {
            taskElement.style.animation = "taskComplete 2s";
            setTimeout(function () {
                taskElement.style.animation = "";
            }, 2000);
        });

        tasksContainer.appendChild(taskElement);
    }

    function toggleEditSave(taskElement) {
        var input = taskElement.querySelector(".text");
        var editButton = taskElement.querySelector(".edit");

        if (input.readOnly) {
            input.readOnly = false;
            editButton.innerText = "Save";
        } else {
            input.readOnly = true;
            editButton.innerText = "Edit";
        }
    }

    function completeTask(taskElement) {
        // Add your logic to handle task completion
        taskElement.style.opacity = "0.5"; // You can customize the appearance for completed tasks
        taskElement.querySelector(".complete").disabled = true;
    }

    function saveTasks() {
        var tasks = [];

        // Get all task texts
        var taskElements = document.querySelectorAll(".text");
        taskElements.forEach(function (element) {
            tasks.push(element.value);
        });

        // Save tasks to localStorage
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        // Load tasks from localStorage
        var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        // Create task elements for each task
        tasks.forEach(function (taskText) {
            createTask(taskText);
        });
    }
});