let productsUICart = localStorage.getItem("cart");
let productsContainer = document.querySelector("#proudects-cart");

if (productsUICart) {
  let items = JSON.parse(productsUICart);
  drawCartProductUI(items);
}

function drawCartProductUI(items) {
  let productsUI = items.map((item) => {
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
                        <button class="btn" onclick ="removeFromCart(${item.id})">Remove From Cart <i
                                class="fa fa-arrow-right"></i></button>
                    </div>
                </div>
    `;
  });

  //   let productsContainer = document.querySelector("#products");
  productsContainer.innerHTML = productsUI;
}

// RemoveItemFromCart
function removeFromCart(id) {
  if (productsContainer) {
    let productsUICart = localStorage.getItem("cart");
    let items = JSON.parse(productsUICart);
    let filteredItems = items.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(filteredItems));
  }
}
