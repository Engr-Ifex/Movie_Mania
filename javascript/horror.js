const backdrop = document.getElementById('backdrop');
const title = document.getElementById('title');
const genres = document.getElementById('genres');
const overview = document.getElementById('overview');
const API_KEY = '8414c7fb9625be12b92527710f830449';
const HORROR_API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27&page=8`;
const HORROR2_API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27&page=6`;

let currentIndex = 0;
let movies = []; // Store entire movie objects

fetch(HORROR_API_URL)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('discover', data.results);
    movies = data.results; // Store all movie objects
    changeBackdrop();
  })
  .catch(error => {
    console.error('Error in fetching movie', error);
  });

function preloadImageAndSetBackground(imageUrl, movie) {
  const img = new Image();
  img.src = imageUrl;

  img.onload = () => {
    backdrop.style.backgroundImage = `url(${imageUrl})`;

    title.style.opacity = 0;
    overview.style.opacity = 0;

    setTimeout(() => {
        title.textContent = movie.title; // Update title
        overview.textContent = movie.overview; // Update overview

        
        
        // Fade in title and overview
        title.style.opacity = 1;
        overview.style.opacity = 1;
      }, 400); 
  };
}

function changeBackdrop() {
  if (movies.length === 0) return; // Ensure movies array is not empty
  const currentMovie = movies[currentIndex]; // Get the current movie
  const imageUrl = `https://image.tmdb.org/t/p/w1280${currentMovie.backdrop_path}`;
  
  preloadImageAndSetBackground(imageUrl, currentMovie); // Pass current movie to function

  currentIndex = (currentIndex + 1) % movies.length;

  setTimeout(changeBackdrop, 4000);
}

fetch(HORROR2_API_URL)
.then (response => {
    if(!response.ok){
        throw new Error('Network response not ok')
    }
    return response.json();
 
})
 .then(data => {
    console.log(data.results);
    moviesGenres(data.results)
 })
.catch(error =>{
    console.error('Error in fetching movie', error)
})

function moviesGenres(movies) {
  genres.innerHTML = movies.map(movie => 
    `
      <div id="genres">
        <div class="trend" key="${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <p>Release date: ${movie.release_date}</p>
        </div>
      </div>
    `
  ).join('')
}