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

const populateBeersSelect = function(){
  makeRequest(beersURL, displayBeers);
}

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

  const ingredients = formatIngredients(beer);

  for (let element of [name, img, ingredients]){
    beerDiv.appendChild(element);
  }

  return beerDiv;
}

const formatIngredients = function(beer){

  const ingredients = document.createElement('div');
  ingredients.className ='ingredients';
  ingredients.innerHTML = "<h6>Ingredients</h6>";

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


//  APP
var app = function(){

  populateBeersSelect();

  


}

// EXTENSIONS

// Refactor to only show details about one beer, and add a dropdown to select the beer to display


window.addEventListener('load', app);
