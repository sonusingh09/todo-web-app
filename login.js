var login = document.getElementById('reg');
var userName = document.getElementById('userName');
var password = document.getElementById('password');
var noUser = document.getElementById('no-user');
noUser.style.display = 'none';
var wrongPass = document.getElementById('wrong-pass');
wrongPass.style.display = 'none';
login.addEventListener('click', function (e) {
  var noUser = document.getElementById('no-user');
  noUser.style.display = 'none';
  var wrongPass = document.getElementById('wrong-pass');
  wrongPass.style.display = 'none';
  e.preventDefault();
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
        if (response[i].username == userName.value) {
          var exist = true;
          var pass = response[i].password;
          break;
        } else var exist = false;
      }
      if (exist) {
        if (pass == password.value) {
          window.location.assign('./index.html');
          localStorage.setItem('login', true);
        } else wrongPass.style.display = 'flex';
      } else {
        noUser.style.display = 'flex';
      }
    }
  };
});
