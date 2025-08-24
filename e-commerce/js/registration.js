let username = document.querySelector('[name="username"]');
let email = document.querySelector('[name="email"]');
let password = document.querySelector('[name="password"]');
let submitButton = document.querySelector("#submitButton");
console.log(username, email, password);
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (username.value && email.value && password.value) {
    localStorage.setItem("username", username.value);
    localStorage.setItem("email", email.value);
    localStorage.setItem("password", password.value);
    alert("Registration successful!");
    setTimeout(() => {
      window.location.href = "login.html";  
    }, 1000);

  } else {
    alert("Please fill in all fields");

    
  }

});
