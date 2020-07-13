$(document).ready(init);

function init() {
  getTask();
  console.log('Ready to go');
  $('#js-btn-task').on('click', addTask);
  $('#viewTasks').on('click', '.js-btn-delete', deleteTask);
  $('#viewTasks').on('click', '.js-btn-update', completeTask);
  $('#completedTask').on('click', '#js-btn-delete', deleteTask);
} // setting click event..

//create functions to call event listeners

function addTask() {
  const task = $('.js-taskIn').val();
  //   let completed = $('.#completedIn').val();

  let taskToSend = {
    task,
    // completed,
  };
  // console.log(taskToSend);

  postTask(taskToSend);
  $('#taskIn').val('');
  $('#completedIn').val('');
} //posting to homepage and setting our values to empty string

function getTask() {
  $.ajax({
    type: 'GET',
    url: '/list',
  })
    .then((dbResponse) => {
      console.log(dbResponse);
      render(dbResponse);
    })
    .catch((error) => {
      console.log(error);
    });
} // function to get our task data from front end

function postTask(taskToSend) {
  $.ajax({
    method: 'POST',
    url: '/list',
    data: taskToSend,
  }).then(function (dbResponse) {
    console.log(dbResponse);
    getTask(dbResponse);
  });
} // function to post request to front end

function deleteTask() {
  console.log('delete');
  const id = $(this).parent().data('id');
  console.log(id);
  $.ajax({
    type: 'DELETE',
    url: '/list/' + id,
  }).then(function (dbResponse) {
    getTask();
  });
} // our delete request

function completeTask() {
  let id = $(this).parent().data('id');

  $.ajax({
    type: 'PUT',
    url: '/list/' + id,
  }).then(function (dbResponse) {
    getTask();
  });
}

function render(tasks) {
  console.log(tasks);
  $('#viewTasks').empty();

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    console.log(task);
    $('#viewTasks').append(`
        <div data-id=${task.id}>
            <p>${task.task}</p>
            <button class='js-btn-delete'>Delete</button>
            <button class='js-btn-update'>Complete</button>
        </div>
    `);

    if (task.task_completed === 'Y') {
      $('#viewTasks').children().last().addClass('done');
    }
  }
}
