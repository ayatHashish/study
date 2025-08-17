// function chractars () {
//     const nartoo = {
//         name: "Nartoo",
//         health: 100,
//         attack: 10,
//         alive: true,
//     };

//     const sasakii = {
//         name: "Sasakii",
//         health: 100,
//         attack: 10,
//         alive: true,
//     };

//     return { nartoo, sasakii };
// }

function characters(name, health, strength) {
  this.name = name;
  this.health = health;
  this.strength = strength;
  this.element = new UICharacters(this.name);
  console.log("Character created: ", this.element);
  // console.log("Character created: " + this.name);
}

function UICharacters(name) {
  this.attachBtn = document.querySelector(`#${name}-attack`);
  this.healthBtn = document.querySelector(`#${name}-health`);
  this.progress = document.querySelector(`.${name}-health-bar`);
  this.alive = document.querySelector(`.${name}-alive`);
}

// دى غلط
// function attack(opponent) {

//   opponent.health -= this.strenght;
//   console.log(opponent.name + " health is now " + opponent.health);
//   }
// ده الصح
characters.prototype.attack = function (opponent) {
  if (this.health > 0) {
    opponent.health -= this.strength;
    opponent.element.progress.style.width = `${opponent.health}%`;
  } else {
    opponent.element.attachBtn.remove();
    opponent.element.healthBtn.remove();
    opponent.element.alive.innerHtml = "Dead";
  }
};

characters.prototype.makeHealth = function () {
  if (this.health < 100) {
    this.health += 10;
    this.element.progress.style.width = `${this.health}%`;
  } else {
    console.log(this.name + " is already at full health.");
  }
};
characters.prototype.status = function () {
  console.log(this.health);
};
// console.log("test: " + this.characters);

let nartoo = new characters("nartoo", 100, 10);
console.log("shof ", nartoo);
let sasakii = new characters("sasakii", 100, 5);
console.log("=====================================");

nartoo.attack(sasakii);
nartoo.makeHealth();
nartoo.status();

console.log("=====================================");

sasakii.attack(sasakii);
sasakii.makeHealth();
sasakii.status();

nartoo.element.attachBtn.addEventListener("click", function () {
  nartoo.attack(sasakii);
});
sasakii.element.attachBtn.addEventListener("click", function () {
  sasakii.attack(nartoo);
});

nartoo.element.healthBtn.addEventListener("click", function () {
  nartoo.makeHealth();
});
sasakii.element.healthBtn.addEventListener("click", function () {
  sasakii.makeHealth();
});
