export const categories = [
  { foodId: 1, foodCategory: "Pizza" },
  { foodId: 2, foodCategory: "Burger" },
  { foodId: 3, foodCategory: "Pasta" },
  { foodId: 4, foodCategory: "Salad" },
];

export const foodItems = [
  // Pizza
  {
    foodId: 101,
    foodName: "Cheese and Corn",
    foodPrice: 100,
    foodImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60",
    foodCategory: 1,
    foodDesc: "Golden cron, cheese, and tangy sauce.",
  },
  {
    foodId: 102,
    foodName: "Cheese and Mushroom",
    foodPrice: 120,
    foodImage: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&auto=format&fit=crop&q=60",
    foodCategory: 1,
    foodDesc: "Fresh mushrooms with mozzarella cheese.",
  },
  {
    foodId: 103,
    foodName: "Margherita",
    foodPrice: 110,
    foodImage: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=60",
    foodCategory: 1,
    foodDesc: "Classic cheese pizza with basil.",
  },
  {
    foodId: 104,
    foodName: "Paneer & Cheese",
    foodPrice: 150,
    foodImage: "https://images.unsplash.com/photo-1593560706856-b1a869ebf816?w=500&auto=format&fit=crop&q=60",
    foodCategory: 1,
    foodDesc: "Spicy paneer cubes with lots of cheese.",
  },
  {
    foodId: 105,
    foodName: "Spicy Tangy",
    foodPrice: 140,
    foodImage: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&auto=format&fit=crop&q=60",
    foodCategory: 1,
    foodDesc: "A spicy kick with tangy tomato sauce.",
  },
  {
    foodId: 106,
    foodName: "Farm Fresh",
    foodPrice: 160,
    foodImage: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&auto=format&fit=crop&q=60",
    foodCategory: 1,
    foodDesc: "Loaded with fresh vegetables.",
  },

  {
    foodId: 108,
    foodName: "Veggie Deluxe",
    foodPrice: 180,
    foodImage: "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?w=500&auto=format&fit=crop&q=60",
    foodCategory: 1,
    foodDesc: "The ultimate veggie pizza experience.",
  },
  {
    foodId: 109,
    foodName: "Paneer Makhni",
    foodPrice: 190,
    foodImage: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=500&auto=format&fit=crop&q=60",
    foodCategory: 1,
    foodDesc: "Tandoori paneer with makhni sauce.",
  },


  // Burger
  {
    foodId: 201,
    foodName: "Classic Veg Burger",
    foodPrice: 70,
    foodImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60",
    foodCategory: 2,
    foodDesc: "Crispy veg patty with fresh lettuce.",
  },
  {
    foodId: 202,
    foodName: "Cheese Burst Burger",
    foodPrice: 120,
    foodImage: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop&q=60",
    foodCategory: 2,
    foodDesc: "Oozing with melted cheddar cheese.",
  },
  {
    foodId: 203,
    foodName: "Spicy Paneer Burger",
    foodPrice: 130,
    foodImage: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500&auto=format&fit=crop&q=60",
    foodCategory: 2,
    foodDesc: "Paneer patty with spicy mayo.",
  },

  // Pasta
  {
    foodId: 301,
    foodName: "White Sauce Pasta",
    foodPrice: 150,
    foodImage: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=500&auto=format&fit=crop&q=60",
    foodCategory: 3,
    foodDesc: "Creamy white sauce with broccoli.",
  },
  {
    foodId: 302,
    foodName: "Red Sauce Pasta",
    foodPrice: 140,
    foodImage: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&auto=format&fit=crop&q=60",
    foodCategory: 3,
    foodDesc: "Tangy tomato sauce with herbs.",
  },

  // Salad
  {
    foodId: 401,
    foodName: "Greek Salad",
    foodPrice: 180,
    foodImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60",
    foodCategory: 4,
    foodDesc: "Fresh cucumber, olives, and feta.",
  },
  {
    foodId: 402,
    foodName: "Caesar Salad",
    foodPrice: 190,
    foodImage: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&auto=format&fit=crop&q=60",
    foodCategory: 4,
    foodDesc: "Lettuce, croutons, and parmesan.",
  },
];

export const menuData = foodItems; // Backwards compatibility if needed
