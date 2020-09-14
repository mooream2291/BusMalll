'use strict'


//create array/loop to run through images

//create images array
var images = []

var uservotes = 0

function randomindex(max) {
    return Math.floor(Math.random()*Math.floor(max))
}

//create constructor function
function Item (name, source) {//this is your object
    this.name = name;
    this.image = source;
    this.votes = 0;
    this.timesShown = 0;
    this.numOfClicks= [];
    this.imagesClicked= [];
}
//may need to add a third parameter that would be an extension to target image source type this.src = `../img/${src}.jpg`; (this is hardcode to source image, this is what the extentsion will be doing the function of)

//img src type needs to coincide with the actual file source/image name

//create random number generator
Vote.prototype.randomimages = function() {
    var generateImages = randomindex(images.length);
}


//put images in HTML
//create event listener for image clicks
//create tracker for image clicks
//add property to object that sotres number of clicks
//add property to object that tracks products that have been clicked
//create loop that sets 25 rounds of clicking
//display report of click numbers (preferably as a percentage value

//create mall image vars//

new Item=('R2D2 Luggage Bag', './images/bag.jpg');
new Item=('Banana Slicer', './images/banana.jpg');
new Item=('Bathroom Ipad Dock', './images/bathroom.jpg');
new Item=('Toeless Rubber Boots', './images/boots.jpg');
new Item=('Compact Breakfast', './images/breakfast.jpg');
new Item=('Meatball Bubblegum', './images/bubblegum.jpg');
new Item=('Red Aesthetic Chair', './images/chair.jpg');
new Item=('Cthulhu Action Figure', './images/cthulhu.jpg');
new Item=('Rare Dragon Meat', './images/dragon.jpg');
new Item=('Duck Beak Muzzle', './images/dog-duck.jpg');
new Item=('Cutlery Pens', './images/pen.jpg');
new Item=('Sweepin Doggy Booties', './images/pet-sweep.jpg');
new Item=('Pizza Scissors', './images/scissors.jpg');
new Item=('Shark Sleeping Bag', './images/shark.jpg');
new Item=('Baby Sweeper', './images/sweep.jpg');
new Item=('Tauntaun Sleeping Bag', './images/tauntaun.jpg');
new Item=('Rare Unicorn Meat', './images/unicorn.jpg');
new Item=('Tentacle USB', './images/usb.jpg');
new Item=('Self-filling Watering Can', './images/water-can.jpg');
new Item=('No-spill Wine Glass', './images/wine-glass.jpg');