// Data needed for a later exercise
const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

// Data needed for first part of the section
const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = "10:00",
    address,
  }) {
    console.log(
      `Order Received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },
  orderPasta: function (ing1, ing2, ing3) {
    console.log("here is your pasta with ", ing1, ing2, ing3);
  },
};

restaurant.orderDelivery({
  time: "10:30",
  address: "Florida Ave, unit 712",
  mainIndex: 2,
  starterIndex: 2,
});

// !    SPREAD OPERATOR
// ? add to new values to the array
const arr = [7, 8, 9];
const longWayArr = [1, 2, arr[0], arr[1], arr[2]];

const shortWayArr = [1, 2, ...arr];
console.log(shortWayArr);
console.log(...shortWayArr);

const newMenu = [...restaurant.mainMenu, "Gnocci", "Cheese"];
console.log(newMenu);
// ? COPY ARRAY
const mainMenuCopy = [...restaurant.mainMenu];

// ? JOINING ARRAYS
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

// ?    ITERABLES ARE (ARRAYS, STRINGS, MAPS, SETS; {BUT NOT OBJECTS})
const str = "Rachel";
const letters = [...str, "", "S."];
console.log(letters);

// const ingredients = [
//   prompt("Let's make pasta! Ingredient 1?"),
//   prompt("Ingredient 2?"),
//   prompt("Ingredient 3?"),
// ];
// console.log(ingredients);

// restaurant.orderPasta(...ingredients);

// ?    Objects and the spread operator
const newRestaurant = {foundedIn: 1990, ...restaurant, founder: 'Guiseppe'}
console.log(newRestaurant);

// !    DESTRUCTURING OBJECTS
// const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories);

// const {
//   name: restaurantName,
//   openingHours: hours,
//   categories: tags,
// } = restaurant;
// console.log(restaurantName, hours, tags);
// !      DEFAULT VALUES
// const { menu = [], starterMenu: starters = []} = restaurant;
// console.log(menu, starters);

// !      MUTATING VARIABLES
// let a = 111;
// let b = 999;
// const obj = {a: 23, b: 7, c: 14};

// ({a, b} = obj);
// console.log(a, b);

// !      NESTED OBJECTS
// const { fri: {open, close} } = openingHours;
// console.log(open, close);
