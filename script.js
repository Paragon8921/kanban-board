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

// SHOW EDIT TASK MODAL when any "Edit" button is clicked
editTask.forEach(button => {
  button.addEventListener('click', () => {
    overlay.style.display = 'block';
    editTaskModal.style.display = 'flex';
  });
});

// HIDE OVERLAY and pop-up MODALS
overlay.addEventListener('click', () => {
  overlay.style.display = 'none';
  editTaskModal.style.display = 'none';
  deleteColumnModal.style.display = 'none';
});

// GET FORM DATA ON SAVE BUTTON
saveTaskBtn.addEventListener('click', e => {
  // e.preventDefault();
  console.log(
    `Title: ${taskTitle.value} - Description: ${taskDescription.value}`
  );
});

// SHOW DELETE COLUMN pop-up MODAL
deleteColumnBtn.addEventListener('click', () => {
  deleteColumnModal.style.display = 'flex';
  overlay.style.display = 'block';
});
