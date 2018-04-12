//  GENERIC API FUNCTIONS

const makeRequest = function(url, callback){
  const request = new XMLHttpRequest();   //  a request object

  request.open('GET', url); // make the request

  request.addEventListener('load', callback)  //  when response, exec callback

  request.send();
};


/// BEERS FUNCTIONS

const initializeBeers = function(url){
  makeRequest(url, function(){

    if(this.status !== 200) return;

    const jsonString = this.responseText;
    const beers = JSON.parse(jsonString);

    const beerSelect = document.getElementById('beer-select');

    populateBeersSelect(beerSelect, beers);

    // beerSelect.addEventListener('change', selectBeer);
    beerSelect.addEventListener('change', function(){
      selectBeer(beers);
    });


  });
}

const populateBeersSelect = function (beerSelect, beers){

  // add each Beer as a Select Option
  beers.forEach(beer => {
    const option = document.createElement('option');
    option.value = beer.name;
    option.innerText = beer.name;
    beerSelect.appendChild(option);
  })

}

//    refactored from makeBeerListItem
const makeBeerDiv = function(beer){

  const beerDiv = document.createElement('div');
  beerDiv.className = 'beer-info';

  const name = document.createElement('h2');
  name.className = 'beer-title';
  name.innerText = beer.name;

  const img = document.createElement('img');
  img.className = 'beer-img';
  img.src = beer.image_url;
  img.alt = beer.name;  //  add the beers name as an alternative

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

const selectBeer = function(beers){
  const beer = getSelectedBeer(beers);
  displayBeer(beer);
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

  const beersURL = "https://api.punkapi.com/v2/beers";

  initializeBeers(beersURL); // populate SELECT with Beers List

}

window.addEventListener('load', app);
