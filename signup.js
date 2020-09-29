var username = document.getElementById('username');
var email = document.getElementById('email');
var userAlreadyExist = document.getElementById('userAlreadyExist');
userAlreadyExist.classList.add('hidden');
var wrongEmail = document.getElementById('wrong-email');
wrongEmail.classList.add('hidden');
var emailAlreadyExist = document.getElementById('emailAlreadyExist');
emailAlreadyExist.classList.add('hidden');
var passNotMatch = document.getElementById('passNotMatch');
passNotMatch.classList.add('hidden');
username.addEventListener('input', function () {
  let xhttp = new XMLHttpRequest();
  xhttp.open(
    'GET',
    'https://5ee248998b27f3001609487b.mockapi.io/user',
    true
  );
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      let response = JSON.parse(this.responseText);
      for (let i = 0; i < response.length; i++) {
        if (response[i].username == username.value) {
          userAlreadyExist.classList.remove('hidden');

          break;
        } else {
          userAlreadyExist.classList.add('hidden');
        }
      }
    }
  };
});

email.addEventListener('input', function () {
  let xhttp = new XMLHttpRequest();
  xhttp.open(
    'GET',
    'https://5ee248998b27f3001609487b.mockapi.io/user',
    true
  );
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      let response = JSON.parse(this.responseText);
      for (let i = 0; i < response.length; i++) {
        if (response[i].email == email.value) {
          emailAlreadyExist.classList.remove('hidden');
          break;
        } else {
          emailAlreadyExist.classList.add('hidden');
        }
      }
    }
  };
});
email.addEventListener('focusout', function () {
  let countAt = 0;
  let countDot = 0;
  let emailText = email.value;
  for (let i = 0; i < emailText.length; i++) {
    if (emailText[i] == '@') countAt++;
    if (emailText[i] == '.') countDot++;
  }
  if (!(countAt == 1 && countDot >= 1)) wrongEmail.classList.remove('hidden');
});
email.addEventListener('focusin', function () {
  wrongEmail.classList.add('hidden');
});

var pass = document.getElementById('pass');
var confirmPass = document.getElementById('confirm-pass');

confirmPass.addEventListener('input', function () {
  if (confirmPass.value != pass.value) {
    passNotMatch.classList.remove('hidden');
  } else passNotMatch.classList.add('hidden');
});

var btnReg = document.getElementById('btn-reg');
btnReg.addEventListener('click', function (e) {
  e.preventDefault();
  let isFieldEmpty =
    username.value == '' ||
    email.value == '' ||
    pass.value == '' ||
    confirmPass.value == '';
  let isWrong =
    wrongEmail.classList.length == 0 ||
    passNotMatch.classList.length == 0 ||
    emailAlreadyExist.classList.length == 0 ||
    userAlreadyExist.classList.length == 0;
  if (isWrong == false && isFieldEmpty == false) {
    let data = {
      username: username.value,
      email: email.value,
      password: pass.value,
    };
    let xhr = new XMLHttpRequest();
    xhr.open(
      'POST',
      'https://5ee248998b27f3001609487b.mockapi.io/user',
      true
    );
    xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xhr.send(JSON.stringify(data));
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        location.assign('./index.html');
        localStorage.setItem('login', true);
      }
    };
  }
});
