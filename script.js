const title = document.querySelector('.board-title');
const columnList = document.querySelectorAll('.column');
const addTaskBtn = document.querySelector('.add-btn');
const overlay = document.querySelector('.overlay');
const editTask = document.querySelectorAll('.edit-task-btn');
const editTaskModal = document.querySelector('.edit-task-modal');
const taskTitle = document.getElementById('title-input');
const taskDescription = document.getElementById('description');
const saveTaskBtn = document.querySelector('.save-task');
const deleteColumnBtn = document.querySelector('.delete-btn');
const deleteColumnModal = document.querySelector('.delete-column');


// Set the board title to an empty string and make it editable
title.addEventListener('click', ()=> {
  title.textContent = '';
  title.setAttribute('contenteditable', true);
})

// event listeners for title
title.addEventListener('keydown', e => {
  // prevents a new line from being created on editable content
  if (e.key === 'Enter') {
    e.preventDefault();
  }

  if (title.textContent.length >= 20) {
    title.setAttribute('contenteditable', false);
  }
});

////////////////////////////////////////////////////////////
// Pop-Up Modals and Overlay
///////////////////////////////////////////////////////////

// DISPLAY the Edit Task Modal and Overlay
function displayEditModal() {
  overlay.style.display = 'block';
  editTaskModal.style.display = 'flex';
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

// SHOW EDIT TASK MODAL when any "Edit" button is clicked
editTask.forEach(button => {
  button.addEventListener('click', displayEditModal);
});

// HIDE OVERLAY and pop-up MODALS
overlay.addEventListener('click', hideModal);

// SHOW DELETE COLUMN pop-up MODAL
deleteColumnBtn.addEventListener('click', displayDeleteModal);
/////////////////////////////////////////////////////////////////

// GET FORM DATA ON SAVE BUTTON
// saveTaskBtn.addEventListener('click', e => {
//   e.preventDefault();
//   console.log(
//     `Title: ${taskTitle.value} - Description: ${taskDescription.value}`
//   );
// });
