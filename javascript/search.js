// const movies1 = document.getElementById('movies1');
// const searchInput = document.getElementById('searchinput');
// const searchbtn = document.getElementById('searchbtn');
// const suggestionBox = document.getElementsByClassName('suggestionbox')
// const API_KEY = '8414c7fb9625be12b92527710f830449';
// const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=6`;
// const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
// let currentIndex = 0;
// let movies = []; // Store entire movie objects




// searchbtn.addEventListener('click', () =>{
//     const query = searchInput.value.trim()
//     if(query){
//         searchMovie(query);
//     }else {
//         fetchMovies()
//     }
// })


// searchInput.addEventListener('input', () => {
//     const query = searchInput.value.trim();
//     console.log('Query:', query);
//     if (query) fetchSuggestions(query);
//     else suggestionBox.innerHTML = ''; 
//   });


// function fetchMovies() {

//     fetch(API_URL)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log('discover', data.results);
//         displaymovies(data.results)
    
//       })
//       .catch(error => {
//         console.error('Error in fetching movie', error);
//       });
// }


// function fetchSuggestions(query) {
//     fetch(SEARCH_URL + query)
//       .then(response => response.json())
//       .then(data => {
//          console.log('Suggestions:', data.results);
//         showSuggestions(data.results)})
//       .catch(error => console.error('Error fetching suggestions:', error));
//   }


// function showSuggestions(movies) {
//     suggestionBox.innerHTML = movies
//       .slice(0, 5) // Limit to 5 suggestions
//       .map(movie => `<div class="suggestionbox" data-id="${movie.id}">
//         <p>${movie.title}</p>
//         </div>`)
//       .join('');
  
   
//     document.querySelectorAll('.suggestionbox').forEach(item => {
//       item.addEventListener('click', () => {
//         const movieTitle = item.textContent;
//         searchInput.value = movieTitle;
//         suggestionBox.innerHTML = ''; // Clear suggestions
//         searchMovie(movieTitle); // Search for the selected movie
//       });
//     });
//   }


// function searchMovie(query) {

//     fetch(SEARCH_URL + query)
//     .then (response => {
//         if(!response.ok){
//             throw new Error('Network response not ok')
//         }
//         return response.json();
     
//     })
//      .then(data => {
//         console.log(data.results);
//         displaymovies(data.results)
//      })
//     .catch(error =>{
//         console.error('Error in fetching movie', error)
//     })
// }








// function displaymovies(movies) {
//     movies1.innerHTML = movies.map(movie => 
//       `
//         <div id="movies1">
//           <div class="trend" key="${movie.id}">
//           <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
//           <p>Release date: ${movie.release_date}</p>
//           </div>
//         </div>
//       `
//     ).join('')
//   }


// fetchMovies()





const movies1 = document.getElementById('movies1');
const searchInput = document.getElementById('searchinput');
const searchbtn = document.getElementById('searchbtn');
const suggestionBox = document.getElementById('suggestionbox');
const API_KEY = '8414c7fb9625be12b92527710f830449';
const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=6`;
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

// Fetch movies on load
fetchMovies();

searchbtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) searchMovie(query);
  else fetchMovies();
});

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim();
  if (query) fetchSuggestions(query);
  else suggestionBox.innerHTML = '';
});


searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const query = searchInput.value.trim();
    if (query) searchMovie(query);
  }
});

document.addEventListener('click', (event) => {
  if (!searchInput.contains(event.target) && !suggestionBox.contains(event.target)) {
    suggestionBox.innerHTML = ''; // Hide the suggestion box
  }
});


function fetchMovies() {
  fetch(API_URL)
    .then(response => response.json())
    .then(data => displayMovies(data.results))
    .catch(error => console.error('Error in fetching movie', error));
}

function displayMovies(movies) {
  movies1.innerHTML = movies.map(movie => `
    <div class="trend" key="${movie.id}">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}"
      onclick="openDetailsPage(${movie.id})"
      >
      <p>Release date: ${movie.release_date}</p>
    </div>
  `).join('');
}

function fetchSuggestions(query) {
  fetch(SEARCH_URL + query)
    .then(response => response.json())
    .then(data => showSuggestions(data.results))
    .catch(error => console.error('Error fetching suggestions:', error));
}

function showSuggestions(movies) {
  suggestionBox.innerHTML = movies.slice(0, 5).map(movie => `
    <div id="suggestion-item" data-id="${movie.id}">
      <p>${movie.title}</p>
    </div>
  `).join('');

  document.querySelectorAll('#suggestion-item').forEach(item => {
    item.addEventListener('click', () => {
      const movieTitle = item.textContent;
      searchInput.value = movieTitle;
      suggestionBox.innerHTML = '';
      searchMovie(movieTitle);
    });
  });
}

function searchMovie(query) {
  fetch(SEARCH_URL + query)
    .then(response => response.json())
    .then(data => displayMovies(data.results))
    .catch(error => console.error('Error in fetching movie', error));
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