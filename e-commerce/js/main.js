const recipes = [
  {
    id: 1,
    title: "chocolate cake",
    description: "A rich and moist chocolate cake recipe that is perfect for any occasion.",
    imageUrl: "https://example.com/chocolate-cake.jpg",
  },
  {
    id: 2,
    title: "Caramel Cake Pancakes",
    imageUrl: "https://images.unsplash.com/photo-1549589237-9e70b6be4da8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=925&q=80",
    description: "If you're fan of caramel cake, then you'll love our Caramel Cake Pancakes. We complete these over-the-top pancakes with Caramel Syrup.",
    timings: [
      { title: "Hands-on Time", value: "30 min" },
      { title: "Total Time", value: "40 min" },
      { title: "Yield", value: "4 servings" },
    ],
    rating: 5,
  },
  {
    id: 3,
    title: "chocolate cake",
    description: "A rich and moist chocolate cake recipe that is perfect for any occasion.",
    imageUrl: "https://example.com/chocolate-cake.jpg",
  },
];
console.log("Rendering recipes:", recipes);

function renderRecipes(recipes) {
  console.log("Rendering recipes:", recipes);
  const container = document.querySelector("#products");
  container.innerHTML = ""; // Clear existing content

  recipes.forEach((recipe) => {
    const recipeElement = document.createElement("div");
    recipeElement.classList.add("recipe");

    recipeElement.innerHTML = `

            <div class="container">
                    <img
                        src="${recipe.imageUrl}"
                        alt="${recipe.title}" />
                    <div class="container__text">
                        <h1>${recipe.title}</h1>
                        <div class="container__text__star">
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                        </div>
                        <p>
                    ${recipe.description}
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
                        <button class="btn">ADd to Cart <i
                                class="fa fa-arrow-right"></i></button>
                    </div>
                </div>
        `;

        

    container.appendChild(recipeElement);
  });
}

renderRecipes(recipes);
