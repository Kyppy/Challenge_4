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
      let test=1
      return test
    })
    .catch(error => {
    error.then((error) => {
      let output =`
      <p id="login-error" style="color:red">${error.message}</p>
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
      let test =0
      return test
    })
  })
}

//Validates then posts incident report data to the web app.Returns a message upon success or failure.
function Post(e){
  e.preventDefault();
  let token = sessionStorage.getItem('token');
  let bearer ='Bearer '+ token;
  let incident = document.getElementById('incident').value;
  let comment = document.getElementById('message').value;
  let location = document.getElementById('location').value;
  let Images = document.getElementById('image').value;
  let Videos = document.getElementById('video').value;

  if (incident ==="Intervention"){
    fetch('http://127.0.0.1:5000/api/v1/interventions', {
    method:'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Authorization':bearer,
      'Content-type':'application/json'
    },
    body:JSON.stringify({type:incident, comment:comment,
    location:location, Images:"[Image]", Videos:"[Video]"})
  })
  .then((res) => {
    if (res.ok){
      return res.json()
    } else{
      return Promise.reject(
        res.json()
      )
    }
  })
  .then((data) => {
    let output=`
    <p id="post-success" style="color:green">Success! ${data.data[0].message}</p>
    `
    document.getElementById('successMessage').innerHTML = output
    return console.log(data.data[0])
  })
  .catch(error => {
    error.then((error) => {
      let output =`
      <p id="post-error" style="color:red">${error.message}</p>
      `
      document.getElementById('errorMessage').innerHTML = output
    })
  })
  }else{
    fetch('http://127.0.0.1:5000/api/v1/redflags', {
    method:'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Authorization':bearer,
      'Content-type':'application/json'
    },
    body:JSON.stringify({type:incident, comment:comment,
    location:location, Images:"[Image]", Videos:"[Video]"})
  })
  .then((res) => {
    if (res.ok){
      return res.json()
    }
    else{
      return Promise.reject(res.json())
    }
  })
  .then((data) => {
    let output=`
    <p id="post-success" style="color:green">Success! ${data.data[0].message}</p>
    `
    document.getElementById('successMessage').innerHTML = output
    return console.log(data.data[0])
  })
  .catch(error => {
    error.then((error) => {
      let output =`
      <p id="post-error" style="color:red">${error.message}</p>
      `
      document.getElementById('errorMessage').innerHTML = output
      })
    })
  }
}

//Sets 'user_profile' value in browser session storage based on clicked username.
function setProfile(username)
{
    sessionStorage.setItem('user_profile',username)
}

//Sets 'user_profile' value in browser session storage to current logged-in user.
function defaultProfile(username)
{
  let current_user = sessionStorage.getItem('user')
  sessionStorage.setItem('user_profile',current_user)
}

//Sets 'map_coordinate' value in browser session storage to selected incident location coordinates.
function setCoordinate(location)
{
  sessionStorage.setItem('map_coordinate',location)
}

//Clears session data on user log-out
function clearSession()
{
  sessionStorage.clear()
}

//Checks if user has elevated permissions/privileges
function checkPrivilege(username)
{
  fetch(`http://127.0.0.1:5000/api/v1/priv/${username}`)
  .then((res) => {
    if (res.ok){
      console.log(incident)
      return res.json()
    }
    else{
      return Promise.reject(
        res.json()
      )
    }
  })
  .then((data) => {
    if (data.data){
      window.location = "admin_home.html"
      return console.log("User privileges:elevated.")
    }
    else{
      return console.log("User privilege:standard")
    }
  })
  .catch(error => {
    return console.log(error)
 })
}
