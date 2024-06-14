document.addEventListener("DOMContentLoaded", () => {
    const addTaskButton = document.getElementById("add-task-button");
    const newTaskInput = document.getElementById("new-task");
    const taskList = document.getElementById("task-list");
    const progressBar = document.getElementById("progress-bar");

    let tasks = [];

    addTaskButton.addEventListener("click", () => {
        const taskText = newTaskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            newTaskInput.value = "";
            updateProgressBar();
        }
    });

    function addTask(text) {
        const task = {
            text: text,
            done: false
        };
        tasks.push(task);
        renderTasks();
    }

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.className = task.done ? "done" : "";
            li.innerHTML = `
                <span class="task-text">${task.text}</span>
                <div class="icons">
                    <button class="icon done" onclick="toggleTaskDone(${index})">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="icon delete" onclick="deleteTask(${index})">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    function toggleTaskDone(index) {
        tasks[index].done = !tasks[index].done;
        renderTasks();
        updateProgressBar();
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
        updateProgressBar();
    }

    function updateProgressBar() {
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.done).length;
        const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
        progressBar.style.width = `${progress}%`;
    }

    window.toggleTaskDone = toggleTaskDone;
    window.deleteTask = deleteTask;
});
