// Need to grab info from the input and add as a list-item
// Select elements
const input = document.getElementById('addTasks');
const addButton = document.getElementById('addTaskBtn');
const listWrapper = document.querySelector('.list-wrapper');

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        if (task.text && task.text.trim() !== '') {
            addTaskToDOM(task.text, task.id);
        }
    });
}

// Save all current tasks to localStorage
function saveTasks() {
    const tasks = Array.from(document.querySelectorAll('.list-item-wrapper')).map(wrapper => {
        return {
            id: wrapper.dataset.id,
            text: wrapper.querySelector('.list-item').textContent
        };
    }).filter(task => task.text && task.text.trim() !== '');
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const taskText = input.value.trim();
    if (taskText === '') return;
    const id = Date.now().toString();
    addTaskToDOM(taskText, id);
    saveTasks();
    input.value = '';
}

function addTaskToDOM(taskText, id) {
    // Create new list item structure
    const itemWrapper = document.createElement('div');
    itemWrapper.className = 'list-item-wrapper';
    itemWrapper.dataset.id = id;

    const checkbox = document.createElement('div');
    checkbox.className = 'checkbox';
    checkbox.tabIndex = 0;
    checkbox.title = 'Mark as done';
    checkbox.addEventListener('click', function() {
        // Show checkmark
        checkbox.innerHTML = '&#10003;'; // Unicode checkmark
        // Add fade-out class
        itemWrapper.classList.add('fade-out');
        setTimeout(() => {
            itemWrapper.remove();
            saveTasks();
        }, 1000); // Match CSS animation duration
    });

    const listItem = document.createElement('div');
    listItem.className = 'list-item';
    listItem.textContent = taskText;

    itemWrapper.appendChild(checkbox);
    itemWrapper.appendChild(listItem);
    listWrapper.appendChild(itemWrapper);
}

// Add event listeners
addButton.addEventListener('click', addTask);
input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Load tasks on page load
window.addEventListener('DOMContentLoaded', loadTasks);

