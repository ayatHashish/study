// أول ما الصفحة تفتح: استرجع cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

let products = [
  { id: 1, name: "Shirt", price: 200 },
  { id: 2, name: "Shoes", price: 500 },
];

// renderCart: تعرض المنتجات على الصفحة
function renderCart() {
  let cartList = document.getElementById("cartList");
  cartList.innerHTML = ""; // نمسح القديم

  let total = 0;

  cart.forEach((item, index) => {
    let li = document.createElement("li");
    li.textContent = `${item.name} - ${item.price} EGP `;

    // زرار remove
    let removeBtn = document.createElement("button");
    removeBtn.textContent = "❌ Remove";
    removeBtn.onclick = function () {
      removeFromCart(index);
    };


    li.appendChild(removeBtn);
    cartList.appendChild(li);

    // نجمع السعر
    total += item.price;
  });

  // نعرض المجموع
  document.getElementById("totalPrice").textContent = `Total: ${total} EGP`;
}

// addToCart: تضيف منتج للسلة وتعيد عرضها
function addToCart(productId) {
  let product = products.find((p) => p.id === productId);
  cart.push(product);

  localStorage.setItem("cart", JSON.stringify(cart));

  renderCart(); // نعرض السلة بعد التحديث
}

// أول ما الصفحة تفتح: نرندر cart اللي موجودة
renderCart();

function removeFromCart(index) {
  // نشيل العنصر من الـ cart
  cart.splice(index, 1);

  // نخزن النسخة الجديدة في LocalStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // نعيد عرض القائمة
  renderCart();
}

let clearBtn = document.querySelector("#clear");

clearBtn.addEventListener("click", clearcart);
function clearcart() {
  cart = [];
  // localStorage.setItem("cart", JSON.stringify(cart));
   localStorage.removeItem("cart"); // امسح المفتاح كله
  renderCart();
}
