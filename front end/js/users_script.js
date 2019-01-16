//Login a single user
function Login(event){
    event.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    fetch('http://127.0.0.1:5000/api/v1/auth/login', {
      method:'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type':'application/json'
      },
      body:JSON.stringify({username:username, password:password})
    })
    .then((res) => {
      if (res.ok){
        return res.json()
      }
      else{
        return Promise.reject(
          res.json()
        )
      }
    })
    .then((data) => {
      sessionStorage.setItem('user',username)
      sessionStorage.setItem('token',data.data[0].token)
      window.location='user_home.html'
    })
    .catch(error => {
    error.then((error) => {
      let output =`
      <p style="color:red">${error.message}</p>
      `
      document.getElementById('errorMessage').innerHTML = output
    })
  })
}

//Validates then stores user registration data from signup form
function Signup(e){
  e.preventDefault();

  let firstname = document.getElementById('firstname').value;
  let lastname = document.getElementById('lastname').value;
  let othername = document.getElementById('othername').value;
  let phonenumber = document.getElementById('phonenumber').value;
  let email = document.getElementById('email').value;
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;

  fetch('http://127.0.0.1:5000/api/v1/auth/signup', {
    method:'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type':'application/json'
    },
    body:JSON.stringify({firstname:firstname, lastname:lastname, 
    othername:othername, phoneNumber:phonenumber, email:email,
    username:username, password:password})
  })
  .then((res) => {
    if (res.ok){
      return res.json()
    }
    else{
      return Promise.reject(
        res.json()
      )
    }
  })
  .then((data) => {
    window.location='login.html'
    return console.log(data.data[0].user)
  })
  .catch(error => {
    error.then((error) => {
      let output =`
      <p style="color:red">${error.message}</p>
      `
      document.getElementById('errorMessage').innerHTML = output
    })
  })
}

