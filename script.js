const title = document.querySelector('.board-title');
const columnList = document.querySelectorAll('.column');
const addColBtn = document.querySelector('.add_btn');
const overlay = document.querySelector('.overlay');
const editTaskModal = document.querySelector('.edit-task-modal');
const taskTitle = document.getElementById('title-input');
const colTitle = document.getElementById('col_title');
const colColor = document.getElementById('col_color');
const editTaskTitle = document.querySelector('.task-title');
const taskDescription = document.getElementById('description');
const saveTaskBtn = document.querySelector('.save-task');
const deleteColumnBtn = document.querySelector('.delete_btn');
const deleteColumnModal = document.querySelector('.delete-column');
const boardColumnsEl = document.querySelector('.board-columns');
const columnTitleSection = document.querySelectorAll('.toggle_color');
const editColModal = document.querySelector('.edit_column_modal');
const editColTitle = document.querySelector('.edit_col_title');
const saveColBtn = document.querySelector('.save_col');

let columnArray = [];
let taskArray = [];
let editColBtn = document.querySelectorAll('.edit_col_btn');
let addTaskBtn = document.querySelectorAll('.add_task');
let editTask = document.querySelectorAll('.edit-task-btn');
let addedCol = document.querySelectorAll('.default');
let taskType = '';

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

// Observer to check on DOM updates
const colObserver = new MutationObserver(() => {
  editColBtn = document.querySelectorAll('.edit_col_btn');
  addTaskBtn = document.querySelectorAll('.add_task');
  editTask = document.querySelectorAll('.edit-task-btn');
  getAllColEditBtn();
  getAllNewTaskBtns();
  getAllEditBtns();
});

// SHOW NEW TASK MODAL when any "Add Task" button is clicked
function getAllNewTaskBtns() {
  addTaskBtn.forEach(function (newTask) {
    newTask.addEventListener('click', () => {
      taskType = 'new';
      displayEditModal();
    });
  });
}

colObserver.observe(boardColumnsEl, { childList: true });
//////////////////////////////////////////////////////////////////

// SHOW EDIT TASK MODAL when any "Edit" button is clicked
function getAllEditBtns() {
  editTask.forEach(function (editTask) {
    editTask.addEventListener('click', () => {
      taskType = 'edit';
      displayEditModal();
    });
  });
}

colObserver.observe(boardColumnsEl, { childList: true });

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
  editColBtn.forEach(col => {
    col.addEventListener('click', () => {
      colTitle.value = '';
      colColor.value = '#000000';
      taskType = 'edit';
      dispalyColModal();
    });
  });
}

colObserver.observe(boardColumnsEl, { childList: true });

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
  </li>`;
  boardColumnsEl.append(div);
}

// Add Task
function addTask(){
  const li = document.createElement('li');
  li.className = 'task';
  li.innerHTML = `                  
  <li class="task">
    <div class="task-contents">
      <span class="task-title">${taskTitle.value}</span>
      <button class="edit-task-btn">EDIT</button>
    </div>
  </li>`
}

function storeColumn(e) {
  addColumn(colTitle.value, colColor.value);
  columnArray.push([{ title: colTitle.value, color: colColor.value }]);
  e.preventDefault();
  localStorage.setItem('columns', JSON.stringify(columnArray));
  // console.log(JSON.parse(localStorage.getItem('columns')));
  hideModal();
}

saveColBtn.addEventListener('click', storeColumn);

// GET FORM DATA ON SAVE BUTTON
// saveTaskBtn.addEventListener('click', e => {
//   e.preventDefault();
//   console.log(
//     `Title: ${taskTitle.value} - Description: ${taskDescription.value}`
//   );
// });

function setTitle() {
  localStorage.setItem('boardTitle', title.textContent);
}

//Load Local Storage
function loadSavedState() {

  //Board Title
  if (localStorage.getItem('boardTitle')) {
    title.textContent = localStorage.getItem('boardTitle');
  }

  //Columns
  if (localStorage.getItem('columns')) {
    columnArray = JSON.parse(localStorage.getItem('columns'));
    let colColor = [];
    columnArray.forEach(col => {
      addColumn(col[0].title);
      colColor.push(col[0].color);
    });
    addedCol = document.querySelectorAll('.default');
    addedCol.forEach((element, index) => {
      element.style.background = colColor[index];
    });
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
  colColor.value = '#000000';
  dispalyColModal();
});

// On Load
loadSavedState();
getAllColEditBtn();
getAllNewTaskBtns();
getAllEditBtns();
