'use strict';


//create array/loop to run through images

//create images array

var totalClicks = [];
var totalViews = [];

Item.allItems = [];
//total rounds

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

function randomIndex() {
  var randomImage = Math.floor(Math.random() * Item.allItems.length);
  return randomImage;
}

//create constructor function
function Item(name, source) {//this is your object
  this.name = name;
  this.image = source;
  this.clicks = 0;
  this.views = 0;
  this.previousImage = false;
  Item.allItems.push(this);
}
//may need to add a third parameter that would be an extension to target image source type this.src = `../img/${src}.jpg`; (this is hardcode to source image, this is what the extentsion will be doing the function of)

//img src type needs to coincide with the actual file source/image name

//create random number generator
// Item.prototype.randomImages = function () {
//     var generateImages = randomIndex(Item.allItems.length);
//     retrurn generateImages;

function generateRandomIndex() {
  var generateImages = randomIndex(Item.allItems.length);
  return generateImages;
}
//put images in HTML
//create event listener for image clicks
//create tracker for image clicks
//add property to object that sotres number of clicks
//add property to object that tracks products that have been clicked
//create loop that sets 25 rounds of clicking
//display report of click numbers (preferably as a percentage value

//create mall image vars//

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


function renderImages() {
  // console.log('Im Alive');
  displayHistory();

  leftContainer.src = Item.allItems[leftIndex].image; //assigning source attribute of image tag in HTML, at leftIndex.image (assigning one at a time) Using the other method will need to assign in a for loop.
  Item.allItems[leftIndex].views++;

  centerContainer.src = Item.allItems[centerIndex].image;
  Item.allItems[centerIndex].views++;

  rightContainer.src = Item.allItems[rightIndex].image;
  Item.allItems[rightIndex].views++;

}

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

  } while (duplicateFound === true);
  itemHistory.unshift(leftIndex, centerIndex, rightIndex);
  if (itemHistory.length > 6) {
    itemHistory.pop();
    itemHistory.pop();
    itemHistory.pop();
  }
  //figure out why this works, and see if you can do it another way
  console.log(leftIndex, centerIndex, rightIndex);
}
function handleVote(event) {

  // console.log('hello');
  var click = event.target.id;
  var itemId = click.src;

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
  if (userVotes === maxRounds) {
    leftContainer.removeEventListener('click', handleVote);
    centerContainer.removeEventListener('click', handleVote);
    rightContainer.removeEventListener('click', handleVote);

    renderChart();

  } else {
    renderImages();
  }
}
leftContainer.addEventListener('click', handleVote);
centerContainer.addEventListener('click', handleVote);
rightContainer.addEventListener('click', handleVote);

renderImages();

function renderChart() {
  var divEl = document.getElementById('images');
  divEl.innerHTML = '';
  var ctx = document.getElementById('mychart').getContext('2d');

  var imageName = [];

  for (var i = 0; i < Item.allItems.length; i++) {
    totalClicks[i] = Item.allItems[i].clicks;
    imageName[i] = Item.allItems[i].name
  }

  var myChart = new Chart(ctx, {
    type: 'bar',//type of chart we are creating
    data:  {
      labels: imageName,
      datasets: [{
        label: 'Number of Votes',
        data: totalClicks,
      }]
    }
  });
}

