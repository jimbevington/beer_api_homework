// API URLs

const beersURL = "https://api.punkapi.com/v2/beers";

//  GENERIC API FUNCTIONS

const makeRequest = function(url, callback){
  const request = new XMLHttpRequest();   //  a request object

  request.open('GET', url); // make the request

  request.addEventListener('load', callback)  //  when response, exec callback

  request.send();
};


/// BEERS FUNCTIONS

const initializeBeers = function(){
  makeRequest(beersURL, function(){

    if(this.status !== 200) return;

    const jsonString = this.responseText;
    const beers = JSON.parse(jsonString);

    populateBeersSelect(beers);
  });
}

const populateBeersSelect = function (beers){

  const beerSelect = document.getElementById('beer-select');

  // add each Beer as a Select Option
  beers.forEach(beer => {
    const option = document.createElement('option');
    option.value = beer.name;
    option.innerText = beer.name;
    beerSelect.appendChild(option);
  })

}

// const displayBeers = function(){
//   if(this.status !== 200) return;
//
//   const jsonString = this.responseText;
//   const beers = JSON.parse(jsonString);
//
//   populateBeersList(beers);
//
// }
//
// const populateBeersList = function(beers){
//
//   const ul = document.getElementById('beers-list');
//
//   beers.forEach(beer => {
//     const beerDiv = makeBeerListItem(beer);
//     ul.appendChild(beerDiv);
//
//   })
// }

const makeBeerDiv = function(beer){

  const beerDiv = document.createElement('div');
  beerDiv.className = 'beer-info';

  const name = document.createElement('h2');
  name.className = 'beer-title';
  name.innerText = beer.name;

  const img = document.createElement('img');
  img.className = 'beer-img';
  img.src = beer.image_url;

  const ingredients = formatIngredients(beer);

  for (let element of [name, img, ingredients]){
    beerDiv.appendChild(element);
  }

  return beerDiv;
}

const formatIngredients = function(beer){

  const ingredients = document.createElement('div');
  ingredients.className ='ingredients';
  ingredients.innerHTML = "<h4>Ingredients</h4>";

  const hops = beer.ingredients.hops;
  const uniqHops = _.uniqBy(hops, 'name');
  const malt = beer.ingredients.malt;
  const yeast = beer.ingredients.yeast;

  const hopsList = document.createElement('div');
  const hopsString = formatNameToList(uniqHops);
  hopsList.innerText = "Hops -   " + hopsString

  const maltList = document.createElement('div');
  const maltString = formatNameToList(malt);
  maltList.innerText = "Malt -   " + maltString;

  const yeastTag = document.createElement('div');
  yeastTag.innerText = "Yeast -   " + yeast

  // need to make a function for this
  for (let element of [hopsList, maltList, yeastTag]){
    ingredients.appendChild(element);
  }

  return ingredients;

}

const formatNameToList = function(arrayOfObjects){
  let output = '';
  for (let i = 0; i < arrayOfObjects.length; i++){
    let obj = arrayOfObjects[i];
    output = output.concat(obj.name);
    if (i != (arrayOfObjects.length - 1)) {
      output = output.concat(", ");
    }
  }
  return output;
}

const selectBeer = function(){
  makeRequest(beersURL, function(){

    if(this.status !== 200) return;

    const jsonString = this.responseText;
    const beers = JSON.parse(jsonString);

    const beer = getSelectedBeer(beers);

    displayBeer(beer);
  });
}

const getSelectedBeer = function(beers){

  const beerSelect = document.getElementById('beer-select');
  const selectedBeer = _.find(beers, {name: beerSelect.value});

  return selectedBeer;
}

const displayBeer = function(beer){
  const beerContainer = document.getElementById('beer-display');
  beerContainer.innerHTML = '';   //  clear any previously displayed Beers

  const beerInfo = makeBeerDiv(beer);   // generate Beer Info
  beerContainer.appendChild(beerInfo);
}

//  APP
var app = function(){

  initializeBeers(); // populate SELECT with Beers List

  const beerSelect = document.getElementById('beer-select');
  beerSelect.addEventListener('change', selectBeer);

}

window.addEventListener('load', app);
