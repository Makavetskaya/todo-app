const addTaskBtn = document.querySelector('.add-task-btn');
const descTaskInput = document.getElementById('description-task');
const themeBtn = document.querySelector('.themetoggle');
const todosWrapper = document.querySelector('.dotos__wrapper');
const toggleTheme = document.querySelector('.toggle-theme');

let tasks; //array where new tasks are added
let todosItemElems = [];
!localStorage.tasks
  ? (tasks = [])
  : (tasks = JSON.parse(localStorage.getItem('tasks')));
// if localstorage is empty then task is equal to empty []

/*========== CONSTRUCTOR NEW TASKS  ===============*/
function Task(description) {
  this.description = description;
  this.completed = false;
  this.active = true;
}

const createTemplate = (task, index) => {
  return `        
    <div class="todos__item wrapper${task.completed ? ' completed' : ''}">
    <div class="todos__wrapper">
    <div class='checkbox-comlete'>
    <input onclick="completeTask(${index})" type="checkbox" class= "btn-complete btn" ${
    task.completed ? 'checked' : ''
  } />
    <label onclick="completeTask(${index})" class="checkbox-label" ${
    task.completed ? 'checked' : ''
  }>
    </label>
    </div>
    <div class="description">${task.description}</div>
    <button onclick="deleteTask(${index})"class="btn-delete"><span class="material-symbols-outlined close">
    close
    </span></button>
  </div>
</div>`;
};

const filterTask = () => {
  const activeTasks =
    tasks.length && tasks.filter((item) => item.completed === false);
  const completedTasks =
    tasks.length && tasks.filter((item) => item.completed === true);
  tasks = [...activeTasks, ...completedTasks];
};
const fillHtmlList = () => {
  todosWrapper.innerHTML = '';
  if (tasks.length > 0) {
    filterTask();
    tasks.forEach((item, index) => {
      todosWrapper.innerHTML += createTemplate(item, index);
    });
    todosItemElems = document.querySelectorAll('.todos__item');
  }
};
fillHtmlList();

const updateLocal = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const completeTask = (index) => {
  tasks[index].completed = !tasks[index].completed;
  if (tasks[index].completed) {
    todosItemElems[index].classList.add('.completed');
  } else {
    todosItemElems[index].classList.remove('.completed');
  }
  updateLocal();
  fillHtmlList();
};

const activeTask = (index) => {
  tasks[index].active = !tasks[index].active;
  if (tasks[index].active) {
    todosItemElems[index].classList.add('.active');
  } else {
    todosItemElems[index].classList.remove('.active');
  }
  updateLocal();
  fillHtmlList();
};

addTaskBtn.addEventListener('click', () => {
  tasks.push(new Task(descTaskInput.value));
  updateLocal();
  fillHtmlList();
  descTaskInput.value = '';
});

const deleteTask = (index) => {
  setTimeout(() => {
    todosItemElems[index].classList.add('delition');
    tasks.splice(index, 1);
    updateLocal();
    fillHtmlList();
  }, 400);
};

/*========== CHENGE THEME ===============*/

const theme = () => {
  let el = document.documentElement;
  toggleTheme.addEventListener('click', () => {
    if (el.hasAttribute('data-theme')) {
      el.removeAttribute('data-theme');
      localStorage.removeItem('theme');
    } else {
      el.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  });

  if (localStorage.getItem('theme') !== null) {
    el.setAttribute('data-theme', 'dark');
  }
};

theme();

/*========== FILTER ===============*/

const filterOption = document.querySelector('.nav-links');
const todoItem = document.querySelectorAll('.todos__item');
const listItems = document.querySelectorAll('.nav-item ');

const filter = () => {
  setTimeout(() => {
    filterOption.addEventListener('click', (e) => {
      const targetId = e.target.dataset.id;
      const target = e.target;
      listItems.forEach((listItem) => listItem.classList.remove('active'));
      target.classList.add('active');
      switch (targetId) {
        case 'all':
          todoItem.forEach((item) => {
            if (item.classList.contains('')) {
              item.style.display = 'none';
            } else {
              item.style.display = 'block';
            }
          });
          break;
        case 'completed':
          todoItem.forEach((item) => {
            if (item.classList.contains('completed')) {
              item.style.display = 'block';
            } else {
              item.style.display = 'none';
            }
          });
          break;
        case 'active':
          todoItem.forEach((item) => {
            if (!item.classList.contains('completed')) {
              item.style.display = 'block';
            } else {
              item.style.display = 'none';
            }
          });
          break;
      }
    });
  }, 400);
};
filter();
