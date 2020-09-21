'use strict';

//create voting sequence that disaplys 25 rounds of 3 images and render results in chart.js//
if (localStorage.VoterClicks) {
  var totalClicks = JSON.parse(localStorage.VoterClicks);
}else {
  var totalClicks = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
}
//global variables//
var totalViews = [];

Item.allItems = [];

var maxRounds = 25;

var itemHistory = [];

var leftIndex = null;
var centerIndex = null;
var rightIndex = null;

var parentContainer = document.getElementById('images');
var leftContainer = document.getElementById('left');
var centerContainer = document.getElementById('center');
var rightContainer = document.getElementById('right');

var userVotes = 0;
//creates random index value//
function randomIndex() {
  var randomImage = Math.floor(Math.random() * Item.allItems.length);
  return randomImage;
}

//constructor function//
function Item(name, source) {//this is your object
  this.name = name;
  this.image = source;
  this.clicks = 0;
  this.views = 0;
  this.previousImage = false;
  Item.allItems.push(this);
}

//generates random image using randomIndex function//
function generateRandomIndex() {
  var generateImages = randomIndex(Item.allItems.length);
  return generateImages;
}

//create image instances//

new Item('R2D2 Luggage Bag', 'images/bag.jpg');
new Item('Banana Slicer', 'images/banana.jpg');
new Item('Bathroom Ipad Dock', 'images/bathroom.jpg');
new Item('Toeless Rubber Boots', 'images/boots.jpg');
new Item('Compact Breakfast', 'images/breakfast.jpg');
new Item('Meatball Bubblegum', 'images/bubblegum.jpg');
new Item('Red Aesthetic Chair', 'images/chair.jpg');
new Item('Cthulhu Action Figure', 'images/cthulhu.jpg');
new Item('Rare Dragon Meat', 'images/dragon.jpg');
new Item('Duck Beak Muzzle', 'images/dog-duck.jpg');
new Item('Cutlery Pens', 'images/pen.jpg');
new Item('Sweepin Doggy Booties', 'images/pet-sweep.jpg');
new Item('Pizza Scissors', 'images/scissors.jpg');
new Item('Shark Sleeping Bag', 'images/shark.jpg');
new Item('Baby Sweeper', 'images/sweep.png');
new Item('Tauntaun Sleeping Bag', 'images/tauntaun.jpg');
new Item('Rare Unicorn Meat', 'images/unicorn.jpg');
new Item('Tentacle USB', 'images/usb.gif');
new Item('Self-filling Watering Can', 'images/water-can.jpg');
new Item('No-spill Wine Glass', 'images/wine-glass.jpg');

console.log(Item.allItems);

//display new images that were not shown in previous round//
function renderImages() {
  
  displayHistory();

  leftContainer.src = Item.allItems[leftIndex].image;
  Item.allItems[leftIndex].views++;

  centerContainer.src = Item.allItems[centerIndex].image;
  Item.allItems[centerIndex].views++;

  rightContainer.src = Item.allItems[rightIndex].image;
  Item.allItems[rightIndex].views++;

}
//set parameters for tracking display history//
function displayHistory() {
  do {
    var duplicateFound = false;
    do {

      leftIndex = generateRandomIndex();
      centerIndex = generateRandomIndex();
      rightIndex = generateRandomIndex();

    } while (leftIndex === rightIndex || centerIndex === leftIndex || centerIndex === rightIndex);

    for (var i = 0; i < itemHistory.length; i++) {
      if (leftIndex === itemHistory[i] || centerIndex === itemHistory[i] || rightIndex === itemHistory[i]) {
        duplicateFound = true;
      }
    }
//stores 6 images in an arrat at any given time and removes the last three when a new round is shown//
  } while (duplicateFound === true);
  itemHistory.unshift(leftIndex, centerIndex, rightIndex);
  if (itemHistory.length > 6) {
    itemHistory.pop();
    itemHistory.pop();
    itemHistory.pop();
  }
  console.log(leftIndex, centerIndex, rightIndex);
}
//event handler//
function handleVote(event) {

  var click = event.target.id;

  if (click === leftContainer.id || click === centerContainer.id || click === rightContainer.id) {
    userVotes++;

    if (click === 'left') {
      Item.allItems[leftIndex].clicks++;
    } else if (click === 'center') {
      Item.allItems[centerIndex].clicks++;
    } else if (click === 'right') {
      Item.allItems[rightIndex].clicks++;
    } else {
      alert('you must make a selection');
    }
  }
//remove event listeners once 25 rounds has been reached//
  if (userVotes === maxRounds) {
    leftContainer.removeEventListener('click', handleVote);
    centerContainer.removeEventListener('click', handleVote);
    rightContainer.removeEventListener('click', handleVote);
//render chart once 25 rounds has been reached//
    renderChart();

  } else {
    renderImages();
  }
  storedClicks();
}
//add event listeners and call render image function to display images to be clicked//
leftContainer.addEventListener('click', handleVote);
centerContainer.addEventListener('click', handleVote);
rightContainer.addEventListener('click', handleVote);

renderImages();

//render chart function that is called on line 141//
function renderChart() {
  var divEl = document.getElementById('images');
  divEl.innerHTML = '';
  var ctx = document.getElementById('mychart').getContext('2d');

  var imageName = [];

  for (var i = 0; i < Item.allItems.length; i++) {
    // totalClicks[i] += Item.allItems[i].clicks;
    imageName[i] = Item.allItems[i].name;
  }

  var updateChart = storedClicks();

  var myChart = new Chart(ctx, {
    type: 'bar',//type of chart we are creating
    data:  {
      labels: imageName,
      datasets: [{
        label: 'Number of Votes',
        data: updateChart,
        backgroundColor: ['blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue','blue', 'blue', 'blue', 'blue', 'blue','blue', 'blue', 'blue', 'blue', 'blue'],
        
      }]
    }
  });
}
//local storage//
function storedClicks () {
  for (var i = 0; i < Item.allItems.length; i++) {
    // votesToStore.push(Item.allItems[i].clicks);
    totalClicks[i] += Item.allItems[i].clicks;
  }

  var savedClickData = JSON.stringify(totalClicks);

  localStorage.setItem('VoterClicks' , savedClickData);
  //localStorage.setItem is feature of javaScript
  //function triggers to push whatever is in the function into local storage
  //key=VoterClicks: keyword used to pull data from local storage
  //update without discarding current data
  var getKey = localStorage.getItem('VoterClicks');
  var storageObject = JSON.parse(getKey);
  console.log(storageObject, storageObject.name);
  return totalClicks;
}
