var inputBox = document.getElementsByClassName('input-box')[0];
var submitBtn = document.getElementsByClassName('submit-btn')[0];
var todoPending = document.getElementsByClassName('pending')[0];
var todoTasks = document.getElementsByClassName('todo-tasks')[0];
var TodoTask = document.getElementsByClassName('todoTask');
var preLogin = document.getElementById('pre-login');
var postLogin = document.getElementById('post-login');
var loginStatus = window.localStorage.getItem('login');
var logout = document.getElementById('logout');

logout.addEventListener('click', function () {
  localStorage.setItem('login', false);
  location.assign('./index.html');
});
loginStatus = JSON.parse(loginStatus);
if (loginStatus == true) {
  preLogin.classList.add('hidden');
  postLogin.classList.remove('hidden');
} else {
  postLogin.classList.add('hidden');
  preLogin.classList.remove('hidden');
}

function getCard() {
  let xhttp = new XMLHttpRequest();
  xhttp.open(
    'GET',
    'https://5ee248998b27f3001609487b.mockapi.io/todos',
    'true'
  );
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      let getArr = this.responseText;
      getArr = JSON.parse(getArr);
      for (let i = 0; i < getArr.length; i++) {
        let card = createTodo(
          getArr[i].cardpara,
          getArr[i].id,
          getArr[i].pendingCheck
        );
        if (getArr[i].pendingCheck == true) {
          todoPending.appendChild(card);
        } else {
          todoTasks.appendChild(card);
        }
      }
    }
  };
}
getCard();
function createTodo(todo, id, PendingCheck) {
  // <div class="todoTask pending">
  //       <div class="checkBox"><i class="fas fa-check"></i></div>
  //       <div class="desc">
  //         <p class="todoDesc">Make something awesome</p>
  //         <i class="fas fa-times cut"></i>
  //         <i class="far fa-trash-alt dlt"></i>
  //       </div>
  // </div>
  document.getElementById('msg').style.display = 'none';
  let todoTask = document.createElement('div');
  todoTask.classList.add('todoTask');
  todoTask.id = id;
  let pendingCheck = PendingCheck;
  let checkBox = document.createElement('div');
  checkBox.classList.add('checkBox');
  let check = document.createElement('i');
  check.classList.add('fas', 'fa-check');
  checkBox.appendChild(check);
  todoTask.appendChild(checkBox);

  let desc = document.createElement('div');
  desc.classList.add('desc');
  let todoDesc = document.createElement('p');
  todoDesc.classList.add('todoDesc');
  todoDesc.innerText = todo;
  desc.appendChild(todoDesc);
  let cut = document.createElement('i');
  cut.classList.add('fas', 'fa-times', 'cut');

  desc.appendChild(cut);

  let dlt = document.createElement('i');
  dlt.classList.add('far', 'fa-trash-alt', 'dlt');

  desc.appendChild(dlt);

  todoTask.appendChild(desc);

  checkBox.addEventListener('click', function () {
    if (pendingCheck) {
      let xhttp = new XMLHttpRequest();
      xhttp.open(
        'PUT',
        'https://5ee248998b27f3001609487b.mockapi.io/todos/' + todoTask.id,
        'true'
      );
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
          todoTasks.appendChild(todoTask);
          pendingCheck = false;
        }
      };
      xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      xhttp.send(
        JSON.stringify({
          pendingCheck: false,
        })
      );
    } else {
      let xhttp = new XMLHttpRequest();
      xhttp.open(
        'PUT',
        'https://5ee248998b27f3001609487b.mockapi.io/todos/' + todoTask.id,
        'true'
      );
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
          todoPending.appendChild(todoTask);
          pendingCheck = true;
        }
      };
      xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      xhttp.send(
        JSON.stringify({
          pendingCheck: true,
        })
      );
    }
  });

  if (loginStatus != true) {
    checkBox.classList.add('hidden');
    dlt.classList.add('hidden');
    cut.classList.add('hidden');
  }

  cut.addEventListener('click', function () {
    let xhttp = new XMLHttpRequest();
    xhttp.open(
      'DELETE',
      'https://5ee248998b27f3001609487b.mockapi.io/todos/' + todoTask.id,
      'true'
    );
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        todoTask.remove();
      }
    };
    xhttp.send();
    if (TodoTask.length == 0) {
      document.getElementById('msg').style.display = 'block';
    }
  });

  dlt.addEventListener('click', function () {
    let xhttp = new XMLHttpRequest();
    xhttp.open(
      'DELETE',
      'https://5ee248998b27f3001609487b.mockapi.io/todos/' + todoTask.id,
      'true'
    );
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        todoTask.remove();
      }
    };
    xhttp.send();
    if (TodoTask.length == 0) {
      document.getElementById('msg').style.display = 'block';
    }
  });

  return todoTask;
}
function todoCreateHandler() {
  let enteredText = inputBox.value;
  if (enteredText != null && enteredText != '') {
    let data = {
      cardpara: enteredText,
      pendingCheck: true,
    };
    let xhttp = new XMLHttpRequest();
    xhttp.open(
      'POST',
      'https://5ee248998b27f3001609487b.mockapi.io/todos',
      true
    );
    xhttp.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xhttp.send(JSON.stringify(data));
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        let response = JSON.parse(this.responseText);
        let todoCard = createTodo(
          response.cardpara,
          response.id,
          response.pendingCheck
        );
        todoPending.appendChild(todoCard);
        inputBox.value = null;
      }
    };
  } else alert('please enter valid todo');
}

submitBtn.addEventListener('click', todoCreateHandler);

inputBox.addEventListener('keyup', function (e) {
  if (e.which === 13) {
    todoCreateHandler();
  }
});

window.addEventListener('storage', function (e) {
  if (e.key === 'login') localStorage.setItem('login', false);
});
