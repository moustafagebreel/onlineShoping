const signinBtn = document.getElementById('signinBtn');
const signupBtn = document.getElementById('signupBtn');
const nameField = document.getElementById('nameField');
const title = document.getElementById('loginTitle');


signinBtn.onclick =   function(){
  if(signinBtn.classList.contains('disabled')){
  nameField.style.visibility='hidden';
  title.innerHTML='Sign-in';
  signupBtn.classList.add('disabled');
  signinBtn.classList.remove('disabled');
  }else{
      login();
      let username = document.getElementById("email");
      let password=document.getElementById("password");
      username.value="";
      password.value="";
     
  }

  
}

signupBtn.onclick = async function(){
  if(signupBtn.classList.contains('disabled')){
    nameField.style.visibility='visible';
    title.innerHTML='Sign-up';
    signinBtn.classList.add('disabled');
    signupBtn.classList.remove('disabled');
  }else{
   await register();
   let username = document.getElementById("email");
   let password=document.getElementById("password");
   let name=document.getElementById('nameField');
   username.value="";
   password.value="";
   name.value="";
   


  }

}

async function login(){
  let username = document.getElementById("email").value;
  let password=document.getElementById("password").value;
  const data ={email: username,password: password};
  const response = await fetch("http://localhost:5000/api/users/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json"/*,'x-access-token':localStorage.getItem("token")*/ },
  });
  const json = await response.json();
  console.log(json)
  localStorage.setItem("token",json.token) 
  console.log(`Welcome ${json.first_name} ${json.last_name}`);
  if(response.ok){
    location.replace("index.html");
  }
  
}


async function register(){

  let username = document.getElementById("email").value;
  let password=document.getElementById("password").value;
  let name=document.getElementById('nameField').value
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "first_name": username,
  "last_name": "name",
  "email": username,
  "password": password
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:5000/api/users/register", requestOptions)
  .then(response => {
    if(response.status==409){
      alert('This email already exists')
    }else{
      alert('Successfully registered')
    }
  })
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}




// const login = async () => {
//   const username = document.getElementById("username").value;
//   const password = document.getElementById("password").value;
//   const data = { email: username, password: password };
 
// };
