function createImageElement(imagePath) {

  var galleryElement = document.getElementById("gallery");
  var imageElement = document.createElement("img");
  var divElement = document.createElement("div");
  divElement.classList.add("image-container");
  imageElement.src = imagePath;
  divElement.appendChild(imageElement);
  gallery.appendChild(divElement);

  return imageElement;
}

function createGallery(imagePaths) {

  var imageElements = [];

  imagePaths.forEach(function(imagePath) {

    var imageElement = createImageElement(imagePath);
    imageElements.push(imageElement);

  });

  return imageElements;
}

function plotBox (imageElement, x, y, w, h) {

  var box = document.createElement('div');
  imageElement.parentNode.appendChild(box);
  box.classList.add('feature');
  box.style.width = w + 'px';
  box.style.height = h + 'px';
  box.style.left = (imageElement.offsetLeft + x) + 'px';
  box.style.top = (imageElement.offsetTop + y) + 'px';

};

function trackImage(imageElement) {

  imageElement.addEventListener("load", function() {
  
    var tracker = new tracking.ObjectTracker(["face"]);
    
    //image width: 133 and less use step size 1 - figure this out with respect to image width and scale it that way

    if(imageElement.width <= 135)
    {
    
      tracker.setStepSize(1);
      console.log("step size: 1");
    
    } else {

      tracker.setStepSize(1.7);
      console.log("step size: 1.7");

    }

    tracker.on("track", function(event) {

      event.data.forEach(function(box) {

        window.plotBox(imageElement, box.x, box.y, box.width, box.height);
      
      });

    });

    tracking.track(imageElement, tracker);

  });

}

function trackAllImages(imageArray) {

  imageArray.forEach(function(image) {
  
    trackImage(image);
  
  });

}

function retrackAllImages(imageArray) {

  imageArray.forEach(function(image) {
  
    image.dispatchEvent(new Event("load"));
  
  });

}

window.onload = function() {

  imageGallery = createGallery(imagePaths);
  trackAllImages(imageGallery);

}

window.onresize = function() {

  var features = document.getElementsByClassName("feature");

  while(features[0]) {

    features[0].parentNode.removeChild(features[0]);
  
  }

  clearTimeout(resizeTimer);
  resizeTimer = setTimeout("retrackAllImages(imageGallery);", 500);

}

var imageGallery;
var resizeTimer;

var imagePaths =
  [
    "../img/1.jpg",
    "../img/10.jpg",
    "../img/12.jpg",
    "../img/4.jpg",
    "../img/5.jpg",
    "../img/6.jpg",
    "../img/7.jpg",
    "../img/8.jpg",
    "../img/9.jpg",
    "../img/2.jpg",
    "../img/11.jpg",
    "../img/3.jpg",
    "../img/13.jpg",
    "../img/14.jpg",
    "../img/15.jpg",
    "../img/16.jpg"
  ]
