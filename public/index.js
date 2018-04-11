//  GENERIC API FUNCTIONS

const makeRequest = function(url, callback){
  const request = new XMLHttpRequest();   //  a request object

  request.open('GET', url); // make the request

  request.addEventListener('load', callback)  //  when response, exec callback

  request.send();
};


/// BEERS FUNCTIONS

const displayBeers = function(){
  if(this.status !== 200) return;

  const jsonString = this.responseText;
  const beers = JSON.parse(jsonString);

  populateBeersList(beers);

}

const populateBeersList = function(beers){

  const ul = document.getElementById('beers-list');

  beers.forEach(beer => {
    const beerDiv = makeBeerListItem(beer);
    ul.appendChild(beerDiv);

  })
}

const makeBeerListItem = function(beer){

  const beerDiv = document.createElement('li');
  beerDiv.className = 'beer-info';

  const name = document.createElement('h5');
  name.innerText = beer.name;

  const img = document.createElement('img');
  img.className = 'beer-img';
  img.src = beer.image_url;

  const ingredients = document.createElement('div');
  ingredients.className = 'ingredients';
  ingredients.innerHTML = formatIngredients(beer);

  for (let element of [name, img, ingredients]){
    beerDiv.appendChild(element);
  }

  return beerDiv;
}

const formatIngredients = function(beer){
  // get the individual hops
  const hops = beer.ingredients.hops;
  const malt = beer.ingredients.malt;
  const yeast = beer.ingredients.yeast;

  const testArray = [1, 1, 1, 2, 3];
  const uniques = [];
  // Ingredients Label:
  // Hops: x, y, z
  // Malt: x, y, z
  // Yeast: x

}



//  APP
var app = function(){

  const beersURL = "https://api.punkapi.com/v2/beers";
  makeRequest(beersURL, displayBeers);

}

// EXTENSIONS

// Add a list of ingredients for each beer
// There are 3 different types of "ingredients" on the beer object we get back - "malt", "hops", and "yeast". You can choose which to display, or if you're feeling ambitious, try to combine all three into one array and display them all.
// Refactor to only show details about one beer, and add a dropdown to select the beer to display


window.addEventListener('load', app);
