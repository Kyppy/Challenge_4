//Return a single incident post based on its ID
function searchPost(event){
    event.preventDefault();
    let post_id = document.getElementById('post_id').value;
    let incident = document.getElementById('incident').value;
    if(incident ==="Intervention"){
      fetch(`http://127.0.0.1:5000/api/v1/intervention/${post_id}`)
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
        let output = '<h2>Search Result</h2>';
        data.data.forEach(function(user){
          output += `
          <label>#:${user.id}</label>
          <label>Status: ${user.status}</label><br>
          <a id="user-profile" href="user_profile.html" onClick="setProfile('${user.createdBy}')">Author: ${user.createdBy}</a><br>
          <a id="incident-location" href="map.html" onClick="setCoordinate('${user.location}')">Incident Location: ${user.location}</a><br>
          <Label>Post Date: ${user.createdOn}</label><br>
          <p>${user.comment}</p>
          `;
        });
        document.getElementById('results').innerHTML = output
      })
      .catch(error => {
      error.then((error) => {
        return console.log(error.message)
      })
    })  
    }else{
      fetch(`http://127.0.0.1:5000/api/v1/redflag/${post_id}`)
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
        let output = '<h2>Search Result</h2>';
        data.data.forEach(function(user){
          output += `
          <label>#:${user.id}</label>
          <label>Status: ${user.status}</label><br>
          <a id="user-profile" href="user_profile.html" onClick="setProfile('${user.createdBy}')">Author: ${user.createdBy}</a><br>
          <a id="incident-location" href="map.html" onClick="setCoordinate('${user.location}')">Incident Location: ${user.location}</a><br>
          <Label>Post Date: ${user.createdOn}</label><br>
          <p>${user.comment}</p>
          `;
        });
        document.getElementById('results').innerHTML = output
      })
      .catch(error => {
      error.then((error) => {
        return console.log(error.message)
      })
    })
    }
  }

//Delete an intervention post
function deleteIntervention(post_id)
{
    let token = sessionStorage.getItem('token')
    let bearer ='Bearer '+ token
    fetch(`http://127.0.0.1:5000/api/v1/intervention/${post_id}`,{
    method: 'DELETE',
    headers: {
      'Authorization':bearer
    }})
    .then((res) => {
      if (res.ok){
        window.location.reload()
      }
      else{
        return Promise.reject(
          res.json()
        )
      }
    })
    .catch(error => {
    error.then((error) => {
      return console.log(error.message)
    })
  })
}

//Delete a redflag post
function deleteRedflag(post_id)
{
    let token = sessionStorage.getItem('token')
    let bearer ='Bearer '+ token
    fetch(`http://127.0.0.1:5000/api/v1/redflag/${post_id}`,{
    method: 'DELETE',
    headers: {
      'Authorization':bearer
    }})
    .then((res) => {
      if (res.ok){
        window.location.reload()
      }
      else{
        return Promise.reject(
          res.json()
        )
      }
    })
    .catch(error => {
    error.then((error) => {
      return console.log(error.message)
    })
  })
}

//Change page to reveal edit Intervention comment section
function editIntercomment_1(post_id)
{
  fetch(`http://127.0.0.1:5000/api/v1/intervention/${post_id}`)
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
    let output = '<h2>Edit Intervention Comment</h2>';
    data.data.forEach(function(user){
      output += `
        <label>#:${user.id}</label>
        <label>Status: ${user.status}</label><br>
        <label>Author: ${user.createdBy}</label><br>
        <label>Incident Location: ${user.location}</label><br>
        <Label>Post Date: ${user.createdOn}</label><br>
        <p>${user.comment}</p>
        <label>Edit Message:</label>
        <textarea id="edit_inter_comment"></textarea><br>
        <button id="${user.id}" onClick="editIntercomment_2(this.id)">Submit Edit</button>
      `;
    });
    document.getElementById('results').innerHTML = output
    window.scrollTo(0,0)
  })
  .catch(error => {
    error.then((error) => {
      return console.log(error.message)
    })
  })  
}

//Consumes PATCH resource to edit intervention comment
function editIntercomment_2(post_id)
{
  let token = sessionStorage.getItem('token');
  let bearer ='Bearer '+ token;
  let comment = document.getElementById('edit_inter_comment').value;
  fetch(`http://127.0.0.1:5000/api/v1/interventions/${post_id}/comment`,{
      method:'PATCH',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Authorization':bearer,
        'Content-type':'application/json'
      },
      body:JSON.stringify({comment:comment})
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
    window.location.reload()
  })
  .catch(error => {
    error.then((error) => {
      return console.log(error.message)
    })
  })  
}

//Change page to reveal edit Intervention location section
function editInterlocation_1(post_id)
{
  fetch(`http://127.0.0.1:5000/api/v1/intervention/${post_id}`)
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
    let output = '<h2>Edit Intervention Location</h2>';
    data.data.forEach(function(user){
      output += `
        <label>#:${user.id}</label>
        <label>Status: ${user.status}</label><br>
        <label>Author: ${user.createdBy}</label><br>
        <label>Incident Location: ${user.location}</label><br>
        <Label>Post Date: ${user.createdOn}</label><br>
        <p>${user.comment}</p>
        <label>Edit Location:</label>
        <input type="text" id="edit_inter_location"placeholder="Please enter lat-long coordinates"><br>
        <button id="${user.id}" onClick="editInterlocation_2(this.id)">Submit Edit</button>
      `;
    });
    document.getElementById('results').innerHTML = output
    window.scrollTo(0,0)
  })
  .catch(error => {
    error.then((error) => {
      return console.log(error.message)
    })
  })  
}

//Consumes PATCH resource to edit intervention location
function editInterlocation_2(post_id)
{
  let token = sessionStorage.getItem('token');
  let bearer ='Bearer '+ token;
  let location = document.getElementById('edit_inter_location').value;
  fetch(`http://127.0.0.1:5000/api/v1/interventions/${post_id}/location`,{
      method:'PATCH',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Authorization':bearer,
        'Content-type':'application/json'
      },
      body:JSON.stringify({location:location})
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
    window.location.reload()
  })
  .catch(error => {
    error.then((error) => {
      return console.log(error.message)
    })
  })  
}

 //Change page to edit Redflag comment section
 function editRedcomment_1(post_id)
 {
   fetch(`http://127.0.0.1:5000/api/v1/redflag/${post_id}`)
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
     let output = '<h2>Edit Redflag Comment</h2>';
     data.data.forEach(function(user){
       output += `
        <label>#:${user.id}</label>
        <label>Status: ${user.status}</label><br>
        <label>Author: ${user.createdBy}</label><br>
        <label>Incident Location: ${user.location}</label><br>
        <Label>Post Date: ${user.createdOn}</label><br>
        <p>${user.comment}</p>
         <label>Edit Message:</label>
         <textarea id="edit_red_comment"></textarea><br>
         <button id="${user.id}" onClick="editRedcomment_2(this.id)">Submit Edit</button>
       `;
     });
     document.getElementById('results').innerHTML = output
     window.scrollTo(0,0)
   })
   .catch(error => {
     error.then((error) => {
       return console.log(error.message)
     })
   })  
 }

 //Consumes PATCH resource to edit Redflag comment
 function editRedcomment_2(post_id)
 {
   let token = sessionStorage.getItem('token');
   let bearer ='Bearer '+ token;
   let comment = document.getElementById('edit_red_comment').value;
   fetch(`http://127.0.0.1:5000/api/v1/redflags/${post_id}/comment`,{
       method:'PATCH',
       headers: {
         'Accept': 'application/json, text/plain, */*',
         'Authorization':bearer,
         'Content-type':'application/json'
       },
       body:JSON.stringify({comment:comment})
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
     window.location.reload()
   })
   .catch(error => {
     error.then((error) => {
       return console.log(error.message)
     })
   })  
 }

 //Change page to edit Redflag location section
 function editRedlocation_1(post_id)
 {
   fetch(`http://127.0.0.1:5000/api/v1/redflag/${post_id}`)
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
     let output = '<h2>Edit Redflag Location</h2>';
     data.data.forEach(function(user){
       output += `
        <label>#:${user.id}</label>
        <label>Status: ${user.status}</label><br>
        <label>Author: ${user.createdBy}</label><br>
        <label>Incident Location: ${user.location}</label><br>
        <Label>Post Date: ${user.createdOn}</label><br>
        <p>${user.comment}</p>
         <label>Edit Location:</label>
         <input type="text" id="edit_red_location"placeholder="Please enter lat-long coordinates"><br>
         <button id="${user.id}" onClick="editRedlocation_2(this.id)">Submit Edit</button>
       `;
     });
     document.getElementById('results').innerHTML = output
     window.scrollTo(0,0)
   })
   .catch(error => {
     error.then((error) => {
       return console.log(error.message)
     })
   })  
 }

 //Consumes PATCH resource to edit Redflag location
 function editRedlocation_2(post_id)
 {
   let token = sessionStorage.getItem('token');
   let bearer ='Bearer '+ token;
   let location = document.getElementById('edit_red_location').value;
   fetch(`http://127.0.0.1:5000/api/v1/redflags/${post_id}/location`,{
       method:'PATCH',
       headers: {
         'Accept': 'application/json, text/plain, */*',
         'Authorization':bearer,
         'Content-type':'application/json'
       },
       body:JSON.stringify({location:location})
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
     window.location.reload()
   })
   .catch(error => {
     error.then((error) => {
       return console.log(error.message)
     })
   })  
 }

  //Update INTERVENTION status
  function updateInterstatus(post_id){
    let token = sessionStorage.getItem('token');
    let bearer ='Bearer '+ token;
    let status_update = document.getElementById(`inter_status${post_id}`).value;
    fetch(`http://127.0.0.1:5000/api/v1/interventions/${post_id}/status`,{
      method:'PATCH',
      headers: {
          'Accept': 'application/json, text/plain, */*',
          'Authorization':bearer,
          'Content-type':'application/json'
      },
      body:JSON.stringify({status:status_update})
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
      window.location.reload()
      })
      .catch(error => {
        error.then((error) => {
          return console.log(error.message)
        })
      }) 
  }

  //Update REDFLAG status
  function updateRedstatus(post_id){
    let token = sessionStorage.getItem('token');
    let bearer ='Bearer '+ token;
    let status_update = document.getElementById(`red_status${post_id}`).value;
    fetch(`http://127.0.0.1:5000/api/v1/redflags/${post_id}/status`,{
      method:'PATCH',
      headers: {
          'Accept': 'application/json, text/plain, */*',
          'Authorization':bearer,
          'Content-type':'application/json'
      },
      body:JSON.stringify({status:status_update})
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
      window.location.reload()
      })
      .catch(error => {
        error.then((error) => {
          return console.log(error.message)
        })
      }) 
  }

  
