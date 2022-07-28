const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = '';
const topic = 'architecture'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&topic=${topic}&count=${count}`;

// Helper function to setAttributer on DOM elements
const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  };
}


// Create elements for links & photos, add to DOM
const displayPhotos = () => {
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

getPhotosFromApi();