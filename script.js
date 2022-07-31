const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');



let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const topic = 'architecture'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${APIKEY}&topic=${topic}&count=${count}`;

// Check if all images were loaded 
const imageLoaded = () => {
  imagesLoaded++
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper function to setAttributer on DOM elements
const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  };
}


// Create elements for links & photos, add to DOM
const displayPhotos = () => {
  // Reset number of images loaded and set number of total images
  imagesLoaded =0;
  totalImages = photosArray.length;
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_black'
    });
 
    // Create <img> per photo
    const img = document.createElement('img');
    setAttributes(img, {
        src: photo.urls.regular,
        alt: photo.description,
        title: photo.description
    });

    // Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);

    // Put <img> inside <a>, and put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
const getPhotosFromApi = async () => {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    // console.log(photosArray);
    displayPhotos();
  } catch (error) {

  }
}

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    loader.hidden = false;
    getPhotosFromApi();
  }
});

getPhotosFromApi();