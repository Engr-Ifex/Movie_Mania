const backdrop = document.getElementById('backdrop');
const title = document.getElementById('title');
const overview = document.getElementById('overview');
const trending = document.getElementById('trending');
const newRelease = document.getElementById('newRelease');
const action = document.getElementById('action');
const adventure =document.getElementById('adventure');
const drama = document.getElementById('drama')
const horror = document.getElementById('horror');
const fullDetailsButton = document.querySelector('#backdroptext button');
const navLinks = document.querySelectorAll('.nava');
const currentPath = window.location.pathname;
const API_KEY = '8414c7fb9625be12b92527710f830449';
const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=1`;
const TREND_URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=2`
const NEW_RELEASE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&primary_release_date.gte=2024-10-01&primary_release_date.lte=2024-10-18`
const ACTION_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28&page=3`;
const ADVENTURE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=12&page=4`;
const COMEDY_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35&page=5`;
const DRAMA_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=18&page=6`;
const HORROR_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27&page=7`;


let currentIndex = 0;
let movies = []; 


// navLinks.forEach(link => {
//   const linkPath = new URL(link.href).pathname;
//   const linkFileName = linkPath.substring(linkPath.lastIndexOf('/') + 1);
//   const currentFileName = currentPath.substring(currentPath.lastIndexOf('/') + 1);
//   if (linkFileName === currentFileName) {
//     link.classList.add('active');
//   }
// });



fetch(API_URL)
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

let currentMovieId = null; 

function changeBackdrop() {
  if (movies.length === 0) return;
  const currentMovie = movies[currentIndex];
  const imageUrl = `https://image.tmdb.org/t/p/w1280${currentMovie.backdrop_path}`;

  currentMovieId = currentMovie.id; 

  preloadImageAndSetBackground(imageUrl, currentMovie);

  fullDetailsButton.onclick = () => {
    window.location.href = `details.html?movieId=${currentMovieId}`;
  };

  currentIndex = (currentIndex + 1) % movies.length;
  setTimeout(changeBackdrop, 4000);
}



fetch(TREND_URL)
.then (response => {
    if(!response.ok){
        throw new Error('Network response not ok')
    }
    return response.json();
 
})
 .then(data => {
    const five = data.results.slice(0,5)
    console.log('five trending', five);
    trendingMovies(five)
 })
.catch(error =>{
    console.error('Error in fetching movie', error)
})




function trendingMovies(movies) {
  trending.innerHTML = movies.map(movie => 
    `
      <div id="trending">
        <div class="trend" key="${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}"
        onclick="openDetailsPage(${movie.id})"
        >
        <p>Popularity: ${movie.popularity}</p>
        </div>
      </div>
    `
  ).join('')
}





fetch(NEW_RELEASE_URL)
.then (response => {
    if(!response.ok){
        throw new Error('Network response not ok')
    }
    return response.json();
 
})
 .then(data => {
    const five = data.results.slice(0,5)
    console.log('five new', five);
    newReleaseMovies(five)
 })
.catch(error =>{
    console.error('Error in fetching movie', error)
})




function newReleaseMovies(movies) {
  newRelease.innerHTML = movies.map(movie => 
    `
      <div id="newRelease">
        <div class="trend" key="${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}"
        onclick="openDetailsPage(${movie.id})"
        >
        <p>Release date: ${movie.release_date}</p>
        </div>
      </div>
    `
  ).join('')
}


fetch(ACTION_URL)
.then (response => {
    if(!response.ok){
        throw new Error('Network response not ok')
    }
    return response.json();
 
})
 .then(data => {
    const five = data.results.slice(0,5)
    console.log('five action', five);
    actionMovies(five)
 })
.catch(error =>{
    console.error('Error in fetching movie', error)
})




function actionMovies(movies) {
  action.innerHTML = movies.map(movie => 
    `
      <div id="action">
        <div class="trend" key="${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}"
        onclick="openDetailsPage(${movie.id})"
        >
        <p>Release date: ${movie.release_date}</p>
        </div>
      </div>
    `
  ).join('')
}


fetch(ADVENTURE_URL)
.then (response => {
    if(!response.ok){
        throw new Error('Network response not ok')
    }
    return response.json();
 
})
 .then(data => {
    const five = data.results.slice(0,5)
    console.log('five adventure', five);
    adventureMovies(five)
 })
.catch(error =>{
    console.error('Error in fetching movie', error)
})




function adventureMovies(movies) {
  adventure.innerHTML = movies.map(movie => 
    `
      <div id="adventure  ">
        <div class="trend" key="${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}"
        onclick="openDetailsPage(${movie.id})"
        >
        <p>Release date: ${movie.release_date}</p>
        </div>
      </div>
    `
  ).join('')
}

fetch(COMEDY_URL)
.then (response => {
    if(!response.ok){
        throw new Error('Network response not ok')
    }
    return response.json();
 
})
 .then(data => {
    const five = data.results.slice(0,5)
    console.log('five comedy', five);
    comedyMovies(five)
 })
.catch(error =>{
    console.error('Error in fetching movie', error)
})




function comedyMovies(movies) {
  comedy.innerHTML = movies.map(movie => 
    `
      <div id="comedy">
        <div class="trend" key="${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}"
        onclick="openDetailsPage(${movie.id})"
        >
        <p>Release date: ${movie.release_date}</p>
        </div>
      </div>
    `
  ).join('')
}


fetch(DRAMA_URL)
.then (response => {
    if(!response.ok){
        throw new Error('Network response not ok')
    }
    return response.json();
 
})
 .then(data => {
    const five = data.results.slice(0,5)
    console.log('five drama', five);
    dramaMovies(five)
 })
.catch(error =>{
    console.error('Error in fetching movie', error)
})




function dramaMovies(movies) {
  drama.innerHTML = movies.map(movie => 
    `
      <div id="drama">
        <div class="trend" key="${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}"
        onclick="openDetailsPage(${movie.id})"
        >
        <p>Release date: ${movie.release_date}</p>
        </div>
      </div>
    `
  ).join('')
}


fetch(HORROR_URL)
.then (response => {
    if(!response.ok){
        throw new Error('Network response not ok')
    }
    return response.json();
 
})
 .then(data => {
    const five = data.results.slice(0,5)
    console.log('five horror', five);
    horrorMovies(five)
 })
.catch(error =>{
    console.error('Error in fetching movie', error)
})




function horrorMovies(movies) {
  horror.innerHTML = movies.map(movie => 
    `
      <div id="horror">
        <div class="trend" key="${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}"
        onclick="openDetailsPage(${movie.id})"
        >
        <p>Release date: ${movie.release_date}</p>
        </div>
      </div>
    `
  ).join('')
}


function openDetailsPage(movieId) {
  window.location.href = `details.html?movieId=${movieId}`;
}



const ham = document.getElementById('ham');
const resnav = document.getElementById('resnav');
const closeBtn = document.getElementById('resbtn');


ham.addEventListener('click', () => {
  resnav.classList.add('active');
});


closeBtn.addEventListener('click', () => {
  resnav.classList.remove('active');
});















