// This repo is optional extra practice to use the underscore functions.
// Here we'll be writing new functions, but these functions will use
// the underscore functions within them.

// If you would like to take a look at the inputs that are passed into these functions, please
// feel free to check out the data.js file.

/*
 *
 *  _.each
 *
 */

// use _.each to create a copy of the given array.
var moreFruits = function (fruits) {
  var results = [];

  _.each(fruits, function(fruit, index, collection) {
    results.push(fruit);
  });

  return results;
};

// use _.each to traverse the number array and determine
// which are multiples of five.
var multiplesOfFive = function (numbers) {
  var numberOfMultiples = 0;

  _.each(numbers, function(number, index, collection) {
    if (number % 5 === 0) {
      numberOfMultiples++;
    }
  });

  return numberOfMultiples;
};

// use _.each to build an array containing only tweets belonging to a specified user.
var getUserTweets = function(tweets, user) {
  var userTweets = [];

  _.each(tweets, function(message, index, collection) {
    if (message.user === user) {
      userTweets.push(tweets[index]);
    }
  });

  return userTweets;
};

/*
 *
 *  _.filter
 *
 */

// use _.filter to return the fruits array with only the desired fruit.
var onlyOneFruit = function (fruits, targetFruit) {
  var isTargetFruit = function(fruit) {
    return fruit === targetFruit;
  };
  var filteredFruits = _.filter(fruits, isTargetFruit);
  return filteredFruits;
};

// use _.filter to return the fruits array with only fruits
// starting with the letter 'P'.
var startsWith = function (fruits, letter) {
  var startsWithLetter = function(fruit, index, fruits) {
    return fruit[0] === letter;
  };
  var filteredElements = _.filter(fruits, startsWithLetter);
  return filteredElements;
};

// return a filtered array containing only cookie-type desserts.
var cookiesOnly = function (desserts) {
  var isACookie = function(dessert) {
    return dessert.type === 'cookie';
  };
  var filteredDesserts = _.filter(desserts, isACookie);
  return filteredDesserts;
};

// rebuild the getUserTweets function from above with _.filter instead
var filterUserTweets = function(tweets, user) {
  var isThisUsersTweet = function(message) {
    return message.user === user;
  };
  var filteredTweets = _.filter(tweets, isThisUsersTweet);
  return filteredTweets;
};

/*
 *
 *  _.map
 *
 */

// given an array of strings, use _.map to return a new array containing all
// strings converted to uppercase letters.
var upperCaseFruits = function (fruits) {
  _.map(fruits, function(fruit, index, collection) {
    return fruit.toUpperCase();
  });
};

// given an array of dessert objects, return a new array of objects
// that have a new "glutenFree" property, with a boolean value.
// TIP: Items that contain flour are not gluten-free.
var glutenFree = function (desserts) {
  var isFlourless = function(dessert) {
    if (_.indexOf(dessert.ingredients, 'flour') === -1) {
      dessert.glutenFree = true;
      return dessert;
    } else {
      dessert.glutenFree = false;
      return dessert;
    }
  };
  var mappedDesserts = _.map(desserts, isFlourless);
  return mappedDesserts;
};

// given an array of tweet objects, return a new array of strings
// containing only the message properties.
var allUserMessages = function(tweets) {
  var getMessages = function(tweet) {
    tweet = tweet.message;
    return tweet;
  };
  var mappedMessages = _.map(tweets, getMessages);
  return mappedMessages;
};

// use _.map to return an array of items with their sale prices, with a new property
// containing the sale price. round any decimals to 2 places.
//
// having trouble with decimals? check out this article:
// http://adripofjavascript.com/blog/drips/avoiding-problems-with-decimal-math-in-javascript.html
//
/*

 example output:
  var salePrices = applyCoupon(groceries, 0.20);
  [
    {
      id: 1,
      product: 'Olive Oil',
      price: '$12.1',
      salePrice: '$9.68'
    }
  ];

*/
var applyCoupon = function (groceries, coupon) {
  var getSalePrice = function(item) {
    var adjustedPrice = item.price;
    adjustedPrice = adjustedPrice.slice(1);
    adjustedPrice = Number(adjustedPrice) * 100;
    var couponAdded = (adjustedPrice * (1 - coupon)) / 100;
    couponAdded = couponAdded.toFixed(2);
    item.salePrice = '$' + couponAdded;
    return item;
  };
  var mappedGroceries = _.map(groceries, getSalePrice);
  return mappedGroceries;
};

/*
 *
 *  _.reduce
 *
 */

// return the total price of all products.
var sumTotal = function (products) {
  var getTotalPrice = function(totalPrice, product) {
    adjustedItemPrice = product.price.slice(1);
    adjustedItemPrice = Number(adjustedItemPrice) * 100;
    totalPrice = totalPrice * 100;
    totalPrice = (totalPrice + adjustedItemPrice) / 100;
    totalPrice = Number(totalPrice.toFixed(2));
    return totalPrice;
  };
  var reducedProducts = _.reduce(products, getTotalPrice, 0);
  return reducedProducts;
};

// return an object consisting of dessert types and how many of each.
// exampleOutput: { dessertType: 3, dessertType2: 1 }
var dessertCategories = function (desserts) {
  var getDessertType = function(dessertTypeCount, dessert) {
    if (dessertTypeCount[dessert.type] === undefined) {
      dessertTypeCount[dessert.type] = 1;
      return dessertTypeCount;
    } else {
      dessertTypeCount[dessert.type]++;
      return dessertTypeCount;
    }
  };
  var reducedDesserts = _.reduce(desserts, getDessertType, {});
  return reducedDesserts;
};

// return an object with the proper count of all user messages
/*
 example output:
  var tweetCountPerUser = countMessagesPerUser(tweets);
  {
    "douglascalhoun": 5,
    "mracus": 6,
    "shawndrost": 5,
    "sharksforcheap": 3
  }
*/
var countMessagesPerUser = function(tweets) {
  var getUserMessageCounts = function(userMessageCount, tweet) {
    if (userMessageCount[tweet.user] === undefined) {
      userMessageCount[tweet.user] = 1;
      return userMessageCount;
    } else {
      userMessageCount[tweet.user]++;
      return userMessageCount;
    }
  };
  var reducedMessages = _.reduce(tweets, getUserMessageCounts, {});
  return reducedMessages;
};

// given an array of movie data objects,return an array containing
// movies that came out between 1990 and 2000.
// TIP: use an array as your accumulator - don't push to an external array!
var ninetiesKid = function (movies) {
  var getMoviesInRange = function(moviesInRange, movie) {
    if (movie.releaseYear >= 1990 && movie.releaseYear <= 2000) {
      moviesInRange.push(movie.title);
    }
    return moviesInRange;
  };
  var reducedMovies = _.reduce(movies, getMoviesInRange, []);
  return reducedMovies;
};

// return an boolean stating if there exists a movie with a shorter
// runtime than your time limit.
// timeLimit is an integer representing a number of minutes.
var movieNight = function (movies, timeLimit) {
  var getShortestRuntime = function(shortestRuntime, movie) {
    if (shortestRuntime > movie.runtime) {
      shortestRuntime = movie.runtime;
    }
    return shortestRuntime;
  };
  var reducedRuntimes = _.reduce(movies, getShortestRuntime, 300);
  return reducedRuntimes < timeLimit;
};
