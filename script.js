const title = document.querySelector('.board-title');
const columnList = document.querySelectorAll('.column');
const addColBtn = document.querySelector('.add_btn');
const overlay = document.querySelector('.overlay');
const editTaskModal = document.querySelector('.edit-task-modal');
const colTitle = document.getElementById('col_title');
const colColor = document.getElementById('col_color');
const editTaskTitle = document.querySelector('.task-title');
const saveTaskBtn = document.querySelector('.save-task');
const deleteTaskBtn = document.querySelector('.delete_task');
const deleteColumnBtn = document.querySelector('.delete_btn');
const deleteColumnModal = document.querySelector('.delete-column');
const boardColumnsEl = document.querySelector('.board-columns');
const columnTitleSection = document.querySelectorAll('.toggle_color');
const editColModal = document.querySelector('.edit_column_modal');
const editColTitle = document.querySelector('.edit_col_title');
const saveColBtn = document.querySelector('.save_col');
const columnContents = document.querySelector('.column-contents');

let columnArray = [];
let taskArray = [];
let currentCol = '';
let currentTask = '';
let editColBtn = document.querySelectorAll('.edit_col_btn');
let addTaskBtn = document.querySelectorAll('.add_task');
let editTask = document.querySelectorAll('.edit-task-btn');
let addedCol = document.querySelectorAll('.default');
let taskList = document.querySelectorAll('.task_list');
let taskType = '';
let taskTitle = document.getElementById('title-input');
let taskDescription = document.getElementById('description');

////////////////////////////////////////////////////////////
// Pop-Up Modals and Overlay
///////////////////////////////////////////////////////////

//////////////////////////////////////
//////////////  TASKS  //////////////
/////////////////////////////////////

// DISPLAY the Edit Task Modal and Overlay
function displayEditModal() {
  overlay.style.display = 'block';
  editTaskModal.style.display = 'flex';
  if (taskType === 'edit') {
    editTaskTitle.textContent = 'EDIT TASK';
  } else {
    editTaskTitle.textContent = 'NEW TASK';
  }
}

// DISPLAY the delete column Modal and Overlay
function displayDeleteModal() {
  deleteColumnModal.style.display = 'flex';
  overlay.style.display = 'block';
}

// HIDE the Modals and Overlay
function hideModal() {
  overlay.style.display = 'none';
  editTaskModal.style.display = 'none';
  deleteColumnModal.style.display = 'none';
  editColModal.style = 'none';
}

// SHOW NEW TASK MODAL when any "Add Task" button is clicked
function getAllNewTaskBtns() {
  addTaskBtn.forEach(function (newTask, i) {
    newTask.addEventListener('click', () => {
      taskTitle.value = '';
      taskDescription.value = '';
      taskType = 'new';
      displayEditModal();
      currentCol = i;
    });
  });
}

//////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////
////////////////////// LOCAL STORAGE FUNCTIONS ///////////////////
//////////////////////////////////////////////////////////////////

function setTaskLocalStorage(key) {
  localStorage.setItem(`${key}`, JSON.stringify(taskArray));
}

//////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////
////////////////////// DOM OBSERVERS /////////////////////////////
//////////////////////////////////////////////////////////////////

// Observer to check on DOM updates for COLUMNS
const colObserver = new MutationObserver(() => {
  editColBtn = document.querySelectorAll('.edit_col_btn');
  addTaskBtn = document.querySelectorAll('.add_task');
  editTask = document.querySelectorAll('.edit-task-btn');
  taskList = document.querySelectorAll('.task_list');
  getAllColEditBtn();
  getAllNewTaskBtns();
  getAllEditBtns();
});

colObserver.observe(boardColumnsEl, { childList: true, subtree: true });

///////////////////////////////////////////////////////////////////

// GET TITLE and DESCRIPTION for Task
function getTaskDetails(editTask) {
  let details = taskArray.find(
    task => task.title === editTask.parentElement.childNodes[1].innerHTML
  );

  return details;
}

// SHOW EDIT TASK MODAL when any "Edit" button is clicked
function getAllEditBtns() {
  editTask.forEach(function (editTask) {
    editTask.addEventListener('click', () => {
      taskType = 'edit';
      taskTitle.value = getTaskDetails(editTask).title;
      taskDescription.value = getTaskDetails(editTask).description;
      currentTask = taskArray.findIndex(task => task.title === taskTitle.value);
      displayEditModal();
    });
  });
}

/////////////////////////////////////////////////////////////////
// HIDE OVERLAY and pop-up MODALS
overlay.addEventListener('click', hideModal);

// SHOW DELETE COLUMN pop-up MODAL
deleteColumnBtn.addEventListener('click', displayDeleteModal);

/////////////////////////////////////////////////////////////////

//////////////////////////////////////
//////////////  COLUMNS  /////////////
/////////////////////////////////////

function getAllColEditBtn() {
  editColBtn.forEach((col, index) => {
    col.addEventListener('click', () => {
      colTitle.value = columnArray[index][0].title;
      colColor.value = columnArray[index][0].color;
      taskType = 'edit';
      dispalyColModal();
    });
  });
}

function dispalyColModal() {
  editColModal.style.display = 'flex';
  overlay.style.display = 'block';
  if (taskType === 'edit') {
    editColTitle.textContent = 'EDIT COLUMN';
  } else {
    editColTitle.textContent = 'NEW COLUMN';
  }
}

/////////////////////////////////////////////////////////////////

// Add Column
function addColumn(title, color) {
  const div = document.createElement('div');
  div.className = 'column';
  div.innerHTML = `
  <li>
    <div class="title-container">
      <span class="column-title default" style="background:${color}">${title.toUpperCase()} <button class="edit_col_btn">EDIT</button></span>
      <button class="add_task">ADD TASK</button>
    </div>
  </li>
  <li>
    <div class="column-contents custom-scroll">
      <ul class="task_list"></ul>
    </div>
  </li>`;
  boardColumnsEl.append(div);
}

function storeColumn(e) {
  addColumn(colTitle.value, colColor.value);
  columnArray.push([{ title: colTitle.value, color: colColor.value }]);
  e.preventDefault();
  localStorage.setItem('columns', JSON.stringify(columnArray));
  hideModal();
}

saveColBtn.addEventListener('click', storeColumn);

// Add Task
function addTask(col, title) {
  const li = document.createElement('li');
  li.className = 'task';
  li.innerHTML = `                  
    <div class="task-contents">
      <span class="task-title">${title}</span>
      <button class="edit-task-btn">VIEW / EDIT</button>
    </div>`;
  taskList[col].append(li);
}

function storeTask(e) {
  // enable to test in console
  e.preventDefault();

  if (taskType === 'new') {
    addTask(currentCol, taskTitle.value);
    taskArray.push({
      column: currentCol,
      title: taskTitle.value,
      description: taskDescription.value,
    });
    setTaskLocalStorage('tasks');
  } else {
    taskArray[currentTask].title = taskTitle.value;
    taskArray[currentTask].description = taskDescription.value;
    setTaskLocalStorage('tasks');
  }
  hideModal();
}

saveTaskBtn.addEventListener('click', storeTask);

function deleteTask(e) {
  // e.preventDefault();
  taskArray.splice(currentTask, 1);
  setTaskLocalStorage('tasks');
}

deleteTaskBtn.addEventListener('click', deleteTask);

function setTitle() {
  localStorage.setItem('boardTitle', title.textContent);
}

//Load Local Storage
function loadSavedState() {
  //Board Title
  if (localStorage.getItem('boardTitle')) {
    title.textContent = localStorage.getItem('boardTitle');
  }

  //COLUMNS
  if (localStorage.getItem('columns')) {
    columnArray = JSON.parse(localStorage.getItem('columns'));
    columnArray.forEach(col => {
      addColumn(col[0].title, col[0].color);
    });

    // TASKS
    taskList = document.querySelectorAll('.task_list');
    if (localStorage.getItem('tasks')) {
      taskArray = JSON.parse(localStorage.getItem('tasks'));
      taskArray.forEach(taskItem => {
        addTask(taskItem.column, taskItem.title);
      });
    }
  }
}

function editElement(e) {
  e.setAttribute('contenteditable', true);
}

// EVENT LISTENERS for board title
// Set the board title to an empty string and make it editable
title.addEventListener('click', editElement(title));

function setTitleEvent() {
  if (title.textContent.length === 0) {
    loadTitle();
  }
  setTitle();
  title.blur();
}

title.addEventListener('blur', setTitleEvent);

// event listeners for title
title.addEventListener('keydown', e => {
  // prevents a new line from being created on editable content
  if (e.key === 'Enter') {
    e.preventDefault();
    setTitleEvent();
  }

  if (title.textContent.length >= 50) {
    title.setAttribute('contenteditable', false);
    setTitle();
  }
});

// Add Column Event Listner
addColBtn.addEventListener('click', () => {
  taskType = 'new';
  colTitle.value = '';
  colColor.value = '#FFFFFF';
  dispalyColModal();
});

// On Load
loadSavedState();
getAllColEditBtn();
getAllNewTaskBtns();
getAllEditBtns();
