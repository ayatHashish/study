const recipesDB = [
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


localStorage.setItem("recipes", JSON.stringify(recipesDB));