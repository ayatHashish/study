// console.log("Rendering recipes:", recipes);

// function renderRecipes(recipes) {
//   console.log("Rendering recipes:", recipes);
//   const container = document.querySelector("#products");
//   container.innerHTML = ""; // Clear existing content

//   recipes.forEach((recipe) => {
//     const recipeElement = document.createElement("div");
//     recipeElement.classList.add("recipe");

//     recipeElement.innerHTML = `

//             <div class="container">
//                     <img
//                         src="${recipe.imageUrl}"
//                         alt="${recipe.title}" />
//                     <div class="container__text">
//                         <h1>${recipe.title}</h1>
//                         <div class="container__text__star">
//                             <span class="fa fa-star checked"></span>
//                             <span class="fa fa-star checked"></span>
//                             <span class="fa fa-star checked"></span>
//                             <span class="fa fa-star checked"></span>
//                             <span class="fa fa-star checked"></span>
//                         </div>
//                         <p>
//                     ${recipe.description}
//                         </p>
//                         <div class="container__text__timing">
//                             <div class="container__text__timing_time">
//                                 <h2>Hands-on Time</h2>
//                                 <p>30 min</p>
//                             </div>
//                             <div class="container__text__timing_time">
//                                 <h2>Total Time</h2>
//                                 <p>40 min</p>
//                             </div>
//                             <div class="container__text__timing_time">
//                                 <h2>Yield</h2>
//                                 <p>40 min</p>
//                             </div>
//                         </div>
//                         <button class="btn">ADd to Cart <i
//                                 class="fa fa-arrow-right"></i></button>
//                     </div>
//                 </div>
//         `;

//     container.appendChild(recipeElement);
//   });
// }

// renderRecipes(recipes);

let productsContainer = document.querySelector("#products");
function drawProduct() {
  let productsUI = recipes.map((item) => {
    return `
    
            <div class="container">
                    <img
                        src="${item.imageUrl}"
                        alt="${item.title}" />
                    <div class="container__text">
                        <h1>${item.title}</h1>
                        <div class="container__text__star">
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                        </div>
                        <p>
                    ${item.description}
                        </p>
                        <div class="container__text__timing">
                            <div class="container__text__timing_time">
                                <h2>Hands-on Time</h2>
                                <p>30 min</p>
                            </div>
                            <div class="container__text__timing_time">
                                <h2>Total Time</h2>
                                <p>40 min</p>
                            </div>
                            <div class="container__text__timing_time">
                                <h2>Yield</h2>
                                <p>40 min</p>
                            </div>
                        </div>
                        <button class="btn" onclick ="addToCart(${item.id})">ADd to Cart <i
                                class="fa fa-arrow-right"></i></button>
                    </div>
                </div>
    `;
  });

  // let productsContainer = document.querySelector("#products");
  productsContainer.innerHTML = productsUI;
}

drawProduct();

function addToCart(id) {
  // let itemRisapi = recipes.filter ((item) => item.id === id );
  // console.log(itemRisapi)

  let addItem = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];

  if (addItem) {
    addItem.map;
  }
  if (getUserName) {
    let itemRisapi = recipes.find((item) => item.id === id);
    console.log(itemRisapi);
    cartProductTitle.style.display = "block";
    cartProductTitle.innerHTML += itemRisapi.title;

    addItem = [...addItem, itemRisapi];
    // localStorage.setItem("cart", addItem);
    // console.log(localStorage.setItem("cart", addItem);)
    localStorage.setItem("cart", JSON.stringify(addItem));

    if (cartProductTitle.innerHTML !== "") {
      cartProduct.style.display = "block";
    } else {
      cartProduct.style.display = "none";
    }
  } else {
    window.location.href = "login.html";
  }
  // let bad = document.querySelector(".under-badge span");
}
