const taskContainer = document.getElementById("app");

// Lista de tareas mockeadas
let tasks = taskTitles.map((title, index) => {
    return new Task(title, taskDescriptions[index], getRandomFutureDate());
});

function loadData() {
    if (tasks.length > 0) {
        // implementar el renderizado de las tareas
        // Generamos el HTML de cada tarea
        const tasksHTML = tasks.map(task => `
          <div class="task-item">
              <span>${task.title}</span>
          </div>
      `).join(''); // Convertimos el array en un string HTML

        taskContainer.innerHTML = tasksHTML; // Insertamos las tareas en el contenedor
    } else {
        taskConatiner.innerHTML = `<div class="text-center text-gray-400 text-2xl">No hay tareas</div>`;
    }
}

function postData(event) {
    event.preventDefault();

    try {
        // Get form data
        const form = event.target;
        const title = form.title.value;
        const description = form.description.value;
        const dueDate = new Date(form.dueDate.value);

        const task = new Task(title, description, dueDate);

        saveTask(task);
        form.reset();
        const modal = document.getElementById("task-modal");
        modal.checked = false;
        showNotification("Tarea añadida correctamente!");
    } catch (error) {
        showNotification("Error al añadir la tarea. Inténtalo de nuevo.");
    }
}

/**
 *  
 * task actions 
 * 
 * */

function saveTask(task) {
    // implementar la creación de la tarea
    console.log(task);
    tasks.push(task);
    updateTaskCounters();
    loadData();
}

function deleteTask(id) {
    // implementar la eliminación de la tarea
    tasks = tasksfilter(task => task.id !== id);
    updateTaskCounters();
    loadData();
}

/**
 * challenges
 * 
 * */

// Aqui implementar la logica para la busqueda de tareas
function handleChangeFindTask(event) {
    event.preventDefault();
    if (searchTerm === '') {
        loadData();
        return;
    }
    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm) ||
        task.description.toLowerCase().includes(searchTerm)
    );
    renderFilteredTasks(filteredTasks);
}

// Aqui implementar la logica para eliminar tareas
function handleDeleteTask(id) {
    function updateTaskCounters() {
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.completed).length;
        const pendingTasks = tasks.filter(task => !task.completed && task.status === 'Pendiente').length;
        const inProgressTasks = tasks.filter(task => task.status === 'En progreso').length;

        document.getElementById('total-tasks').textContent = totalTasks;
        document.getElementById('completed-tasks').textContent = completedTasks;
        document.getElementById('pending-tasks').textContent = pendingTasks;
        document.getElementById('in-progress-tasks').textContent = inProgressTasks;

        function toggleTaskStatus(id) {
            const task = tasks.find(task => task.id === id);
            if (task) {
                if (task.completed) {
                    task.completed = false;
                    task.status = 'Pendiente';
                } else {
                    task.completed = true;
                    task.status = 'Completada';
                }
                updateTaskCounters();
                loadData();
            }
        }

        function setTaskInProgress(id) {
            const task = tasks.find(task => task.id === id);
            if (task && !task.completed) {
                task.status = 'En progreso';
                updateTaskCounters();
                loadData();
            }
        }
    }
    class Task {
        constructor(title, description, dueDate) {
            this.id = Date.now().toString();
            this.title = title;
            this.description = description;
            this.dueDate = dueDate;
            this.createdAt = new Date();
            this.completed = false;
            this.status = 'Pendiente'; // Puede ser: Pendiente, En progreso, Completada
        }
    }


}

// Aqui implementar la ogica de ver la cnatidad de tareas

// Aqui implementar la logica de ver la cantidad de tareas completadas

// Aqui implementar la logica de ver la cantidad de tareas pendientes

// Aqui implementar la logica de ver la cantidad de tareas en progreso