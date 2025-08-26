
let cartProduct = document.querySelector(".under-badge");
let cartProductTitle = document.querySelector(".under-badge span");
let iconBadge = document.querySelector(".icon-badge");

let LoginLinks = document.querySelector("#before-login");
let LogOutLinks = document.querySelector("#after-login");
let LogOutBtn = document.querySelector("#Log-out");
let userNameDom = document.querySelector(".user-name");


console.log(userNameDom);
let getUserName = localStorage.getItem("username");
if (getUserName) {
  LoginLinks.style.display = "none";
  LogOutLinks.style.display = "flex";
  userNameDom.innerHTML = getUserName;
} else {
  console.log("User not registered yet, please register");
}



LogOutBtn.addEventListener("click", () => {
  localStorage.removeItem("username");
  localStorage.removeItem("email");
  localStorage.removeItem("password");
  window.location.href = "login.html";
});

iconBadge.addEventListener("click", toggleCart);
function toggleCart() {
  if (cartProduct.style.display === "none") {
    cartProduct.style.display = "block";
  } else {
    cartProduct.style.display = "none";
  }
}


