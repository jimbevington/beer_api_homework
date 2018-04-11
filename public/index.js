const makeRequest = function(url, callback){
  const request = new XMLHttpRequest();   //  a request object

  request.open('GET', url); // make the request

  request.addEventListener('load', callback)  //  when response, exec callback

  request.send();
};


const displayBeers = function(){
  if(this.status !== 200) return;

  const jsonString = this.responseText;
  const beers = JSON.parse(jsonString);

  populateBeersList(beers);

}

const populateBeersList = function(beers){
  const ul = document.getElementById('beers-list');

  beers.forEach(beer => {

    const beerDiv = document.createElement('li');
    beerDiv.className = 'beer-info';

    const name = document.createElement('h5');
    name.innerText = beer.name;

    const img = document.createElement('img');
    img.className = 'beer-img';
    img.src = beer.image_url;

    for (let element of [name, img]){
      beerDiv.appendChild(element);
    }

    ul.appendChild(beerDiv);

  })
}


var app = function(){

  const beersURL = "https://api.punkapi.com/v2/beers";
  makeRequest(beersURL, displayBeers);

}



// Make an XMLHttpRequest to get data on brewdog beers back from this API: https://api.punkapi.com/v2/beers
//
// The API can occasionally be unreliable, here's an alternate url - https://s3-eu-west-1.amazonaws.com/brewdogapi/beers.json
//
// Display a list of the names of the beers
//
// try to use small, reuseable functions, for example, one to handle looping through all the data, then using a separate function to create and render each item into the list.
// Add an <img> to each beer
//
// there is an "image_url" key on the beer objects we get back from the API

// EXTENSIONS

// Add a list of ingredients for each beer
// There are 3 different types of "ingredients" on the beer object we get back - "malt", "hops", and "yeast". You can choose which to display, or if you're feeling ambitious, try to combine all three into one array and display them all.
// Refactor to only show details about one beer, and add a dropdown to select the beer to display


window.addEventListener('load', app);
