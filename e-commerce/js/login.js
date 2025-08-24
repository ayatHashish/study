let username = document.querySelector('[name="user-name"]');
let password = document.querySelector('[name="password"]');
let loginSubmitButton = document.querySelector("#login-submit");
console.log(username, password);

let getUser = localStorage.getItem("username");
console.log(getUser);
let getPas = localStorage.getItem("password");
loginSubmitButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (username.value === "" || password.value === "") {
    alert("املاء الحاجه دى ");
  } else {
    if (getUser && getUser.trim() === username.value.trim() && getPas && getPas === password.value.trim()) {
      alert("انت صح يا باشا ");

      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    } else {
      alert("false");
    }
  }
});
