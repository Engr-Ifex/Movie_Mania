const backdrop = document.getElementById('backdrop');
const title = document.getElementById('title');
const overview = document.getElementById('overview');
const description = document.getElementById('description');
const cast = document.getElementById('cast');
const trailer = document.getElementById('trailer');
const releaseDate = document.getElementById('releaseDate');
const language = document.getElementById('language');
const ratings = document.getElementById('ratings');
const genre = document.getElementById('genre');
const duration = document.getElementById('duration');


const API_KEY = '8414c7fb9625be12b92527710f830449';
const MOVIE_API_URL = 'https://api.themoviedb.org/3/movie/';
const movieId = new URLSearchParams(window.location.search).get('movieId');






function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
}

function renderStarRating(rating) {
  const fullStars = Math.floor(rating / 2); // Convert rating to full stars only
  const emptyStars = 5 - fullStars;

  return '★'.repeat(fullStars) + '☆'.repeat(emptyStars);
}



if (movieId) {
    fetch(`${MOVIE_API_URL}${movieId}?api_key=${API_KEY}`)
      .then(response => response.json())
      .then(movie => {
        displayMovieDetails(movie);
      })
      .catch(error => {
        console.error('Error fetching movie details:', error);
      });
  }

  

  function displayMovieDetails(movie) {
    const imageUrl = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;
    

    backdrop.style.backgroundImage = `url(${imageUrl})`;
    

    title.textContent = movie.title;
    overview.textContent = movie.overview;
    description.textContent = movie.overview;
    duration.textContent = formatDuration(movie.runtime);
    releaseDate.textContent = movie.release_date
    ratings.textContent = movie.vote_average

    document.getElementById('star-rating').textContent = renderStarRating(movie.vote_average);

    genre.textContent = movie.genres.map(g => g.name).join(', ');
    language.textContent = movie.original_language;
  


    fetch(`${MOVIE_API_URL}${movieId}/credits?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      const castList = data.cast 
      .slice(0,8)
        .map(cast => `
          <div id="cast">
          <div key="${movie.id}">
            <img src="https://image.tmdb.org/t/p/w200${cast.profile_path}" alt="${cast.name}">
            <h3>${cast.name}</h3>
            <p>${cast.character}</p>
          </div>
          </div>
        `).join('');

      // Display cast in the container
      cast.innerHTML = castList;
    })
    .catch(error => console.error('Error fetching movie credits:', error));



    fetch(`${MOVIE_API_URL}${movieId}/videos?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      const trailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
      if (trailer) {
        document.getElementById('trailer').innerHTML = `
          <iframe width="560" height="315" src="https://www.youtube.com/embed/${trailer.key}" frameborder="0" allowfullscreen></iframe>
        `;
      }
    })
    .catch(error => console.error('Error fetching movie trailer:', error));
}
