// Unsplash API
const count = 10;
const apiKey = '';
const topic = 'architecture'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&topic=${topic}&count=${count}`;

// GEt photos from Unsplash API
const getPhotosFromApi = async () => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json()
  } catch (error) {

  }
}

getPhotosFromApi();