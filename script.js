const title = document.querySelector('.board-title');
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
let columnList = document.querySelectorAll('.column');
let taskType = '';
let taskTitle = document.getElementById('title-input');
let taskDescription = document.getElementById('description');
let deleteColXmark = document.querySelectorAll('.del_col_xmark');
let dragContainer = document.querySelectorAll('.drag-container');
let draggables = document.querySelectorAll('.draggable');
let dragging = false;
let dragItem = '';
let hoveringCol = '';

//////////////////////////////////////////////////////////////////
////////////////////// DOM OBSERVERS /////////////////////////////
//////////////////////////////////////////////////////////////////

// Observer to check on DOM updates for COLUMNS
const colObserver = new MutationObserver(() => {
  editColBtn = document.querySelectorAll('.edit_col_btn');
  addTaskBtn = document.querySelectorAll('.add_task');
  editTask = document.querySelectorAll('.edit-task-btn');
  taskList = document.querySelectorAll('.task_list');
  columnList = document.querySelectorAll('.column');
  deleteColXmark = document.querySelectorAll('.del_col_xmark');
  dragContainer = document.querySelectorAll('.drag-container');
  draggables = document.querySelectorAll('.draggable');
  hoveringCol = document.querySelector('.hovering');

  getAllColEditBtn();
  getAllNewTaskBtns();
  getAllEditBtns();
  getAllDeleteColBtns();
  if (dragging === false) {
    loadDraggables();
  }
});

colObserver.observe(boardColumnsEl, { childList: true, subtree: true });

colObserver.observe(deleteColumnModal, { childList: true, subtree: true });

///////////////////////////////////////////////////////////////////

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
    deleteTaskBtn.style.display = 'block';
    editTaskTitle.textContent = 'EDIT TASK';
  } else {
    deleteTaskBtn.style.display = 'none';
    editTaskTitle.textContent = 'NEW TASK';
  }
}

// DISPLAY the delete column Modal and Overlay
function displayDeleteModal() {
  deleteColumnModal.style.display = 'flex';
  overlay.style.display = 'block';
}

function populateDeleteModal(title, color) {
  const delDiv = document.createElement('div');
  delDiv.className = 'column-item column-title';
  delDiv.style.background = `${color}`;
  delDiv.innerHTML = `
      <span>${title}</span>
      <i class="fa-solid fa-xmark del_col_xmark"></i>
  `;
  deleteColumnModal.append(delDiv);
}

// SHOW DELETE COLUMN pop-up MODAL
deleteColumnBtn.addEventListener('click', () => {
  displayDeleteModal();
  deleteColumnModal.innerHTML = '';
  columnArray.forEach(col => {
    populateDeleteModal(col[0].title, col[0].color);
  });
});

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

function getAllDeleteColBtns() {
  deleteColXmark.forEach(function (deleteColBtn, i) {
    deleteColBtn.addEventListener('click', () => {
      const colEmpty = taskArray.find(element => element.column === i);
      if (colEmpty) {
        alert('Unable to delete Columns with tasks.');
      } else {
        columnArray.splice(i, 1);
        localStorage.setItem('columns', JSON.stringify(columnArray));
        location.reload();
      }
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
function addColumn(title, color, col) {
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
      <ul class="task_list drag-container" data-column="${col}"></ul>
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
function addTask(col, title, i) {
  const li = document.createElement('li');
  li.className = 'task draggable';
  li.draggable = 'true';
  li.innerHTML = `                  
    <div class="task-contents" data-taskIndex="${i}">
      <span class="task-title">${title}</span>
      <button class="edit-task-btn">VIEW / EDIT / DELETE</button>
    </div>`;
  taskList[col].append(li);
}

function storeTask(e) {
  // enable to test in console
  // e.preventDefault();

  if (taskType === 'new') {
    addTask(currentCol, taskTitle.value, taskArray.length);
    taskArray.push({
      column: currentCol,
      taskArrPos: taskArray.length,
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
    columnArray.forEach((col, i) => {
      addColumn(col[0].title, col[0].color, i);
    });

    // TASKS
    taskList = document.querySelectorAll('.task_list');
    if (localStorage.getItem('tasks')) {
      taskArray = JSON.parse(localStorage.getItem('tasks'));
      taskArray.forEach(taskItem => {
        addTask(taskItem.column, taskItem.title, taskItem.taskArrPos);
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

////////////////////////////////////////////////////////////
//////////////////  DRAG AND DROP //////////////////////////
////////////////////////////////////////////////////////////
function loadDraggables() {
  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
      draggable.classList.add('dragging');
      dragItem = document.querySelector('.dragging').firstElementChild;
    });

    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging');
    });
  });

  dragContainer.forEach(container => {
    container.addEventListener('dragover', e => {
      e.preventDefault();
      dragging = true;
      const afterElement = getDragAfterElement(container, e.clientY);
      const dragEl = document.querySelector('.dragging');
      if (afterElement == null) {
        container.appendChild(dragEl);
      } else {
        container.insertBefore(dragEl, afterElement);
      }
      container.classList.add('hovering');
      hoveringCol = document.querySelector('.hovering');
    });

    container.addEventListener('drop', () => {
      container.classList.remove('hovering');
      console.log(dragItem.dataset.taskindex);
      console.log(taskArray[dragItem.dataset.taskindex].column);
      console.log(hoveringCol.dataset.column);
      taskArray[dragItem.dataset.taskindex].column = hoveringCol.dataset.column;
      setTaskLocalStorage('tasks');
    });

    container.addEventListener('dragleave', () => {
      container.classList.remove('hovering');
    });
  });
}

function getDragAfterElement(container, y) {
  const draggableElement = [
    ...container.querySelectorAll('.draggable:not(.dragging)'),
  ];

  return draggableElement.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

// On Load
loadSavedState();
// getAllColEditBtn();
// getAllNewTaskBtns();
// getAllEditBtns();
