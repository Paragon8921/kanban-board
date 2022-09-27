const title = document.querySelector('.board-title');
const columnList = document.querySelectorAll('.column');
const addColBtn = document.querySelector('.add_btn');
const addTaskBtn = document.querySelectorAll('.add_task');
const overlay = document.querySelector('.overlay');
const editTask = document.querySelectorAll('.edit-task-btn');
const editTaskModal = document.querySelector('.edit-task-modal');
const taskTitle = document.getElementById('title-input');
const editTaskTitle = document.querySelector('.task-title');
const taskDescription = document.getElementById('description');
const saveTaskBtn = document.querySelector('.save-task');
const deleteColumnBtn = document.querySelector('.delete_btn');
const deleteColumnModal = document.querySelector('.delete-column');
const boardColumnsEl = document.querySelector('.board-columns');
const columnTitleSection = document.querySelectorAll('.toggle_color');
const columnArray = [];

let taskType = '';

let columnTitles = [];

////////////////////////////////////////////////////////////
// Pop-Up Modals and Overlay
///////////////////////////////////////////////////////////

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
}

// SHOW NEW TASK MODAL when any "Add Task" button is clicked
addTaskBtn.forEach(function (newTask) {
  newTask.addEventListener('click', () => {
    taskType = 'new';
    displayEditModal();
  });
});

// SHOW EDIT TASK MODAL when any "Edit" button is clicked
editTask.forEach(function (editTask) {
  editTask.addEventListener('click', () => {
    taskType = 'edit';
    displayEditModal();
  });
});

// HIDE OVERLAY and pop-up MODALS
overlay.addEventListener('click', hideModal);

// SHOW DELETE COLUMN pop-up MODAL
deleteColumnBtn.addEventListener('click', displayDeleteModal);
/////////////////////////////////////////////////////////////////

// Add Column
function addColumn() {
  const div = document.createElement('div');
  div.className = 'column';
  div.innerHTML = `
  <li>
    <div class="title-container">
      <span class="column-title completed">NEW COLUMN <button class="edit_col_btn">EDIT</button></span>
      <button class="add_task">ADD TASK</button>
    </div>
  </li>`;
  boardColumnsEl.append(div);
}

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

function loadTitle() {
  if (localStorage.getItem('boardTitle')) {
    title.textContent = localStorage.getItem('boardTitle');
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
addColBtn.addEventListener('click', addColumn);

// On Load
loadTitle();
