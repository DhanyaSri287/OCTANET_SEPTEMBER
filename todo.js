// Select necessary elements
const form = document.querySelector('form');
const input = document.querySelector('input');
const taskList = document.querySelector('ul');
const progressBar = document.getElementById('progressbar');
const numberDisplay = document.getElementById('number');

// Initialize tasks array and completed count
let tasks = [];

// Function to update progress
function updateProgress() {
    const totalTasks = tasks.length; // Count the total tasks from the array
    const completedCount = tasks.filter(task => task.completed).length; // Count the completed tasks
    numberDisplay.innerHTML = `${completedCount}/${totalTasks}`; // Update the number display
    
    // Update the progress bar width (if there are tasks)
    progressBar.style.width = totalTasks > 0 ? `${(completedCount / totalTasks) * 100}%` : '0%';
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" id="task-${index}" ${task.completed ? 'checked' : ''}>
            <label for="task-${index}">${task.name}</label>
            <button onclick="editTask(${index})"><i class="ri-edit-box-line"></i></button>
            <button onclick="deleteTask(${index})"><i class="ri-delete-bin-5-line"></i></button>
        `;
        taskList.appendChild(li);
    });
    updateProgress();
}

form.onsubmit = function(e) {
    e.preventDefault();
    if (input.value.trim()) {
        tasks.push({ name: input.value, completed: false });
        input.value = '';
        renderTasks();
    }
};

function editTask(index) {
    const newTaskName = prompt("Edit your Task: ", tasks[index].name);
    if (newTaskName) {
        tasks[index].name = newTaskName;
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Corrected event listener for checkbox state change
taskList.addEventListener('change', (e) => {
    if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
        const index = e.target.id.split('-')[1]; // Correctly split the id to get the task index
        tasks[index].completed = e.target.checked;
        updateProgress(); // No need to re-render everything, just update the progress
    }
});
