const API_KEY = '8414c7fb9625be12b92527710f830449';
const MOVIE_API_URL = 'https://api.themoviedb.org/3/movie/';

// Watchlist page JavaScript
document.addEventListener('DOMContentLoaded', () => {
    displayWatchlist();
});

function displayWatchlist() {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    const watchlistContainer = document.getElementById('watchlistContainer');

    // Check if the watchlist is empty
    if (watchlist.length === 0) {
        watchlistContainer.innerHTML = '<p>No movies have been added to your watchlist.</p>';
        return;
    }

    // Render the watchlist movies
    watchlistContainer.innerHTML = watchlist.map((movie, index) => {
        const hours = Math.floor(movie.runtime / 60);
        const minutes = movie.runtime % 60;
        const durationText = movie.runtime ? `${hours}h ${minutes}m` : 'Duration not available';

        return `
            <div class="watchlist-item" data-id="${movie.id}">
                 <div class="poster-overlay">
                    <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
                    <button class="remove-btn" data-index="${index}">×</button>
                    <div class="details">
                        <h3>${movie.title}</h3>
                        <p>${durationText}</p>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Add click events for removal
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent triggering other events
            const index = event.target.getAttribute('data-index');
            removeFromWatchlist(index);
        });
    });

    // Add click events to play the trailer
    document.querySelectorAll('.watchlist-item').forEach(item => {
        item.addEventListener('click', () => {
            const movieId = item.getAttribute('data-id');
            playTrailer(movieId);
        });
    });
}

function removeFromWatchlist(index) {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    watchlist.splice(index, 1); // Remove the movie from the array
    localStorage.setItem('watchlist', JSON.stringify(watchlist)); // Update localStorage
    displayWatchlist(); // Refresh the display
}




function playTrailer(movieId) {
    fetch(`${MOVIE_API_URL}${movieId}/videos?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            const trailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
            if (trailer) {
                document.getElementById('trailerContainer').innerHTML = `
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/${trailer.key}" frameborder="0" allowfullscreen></iframe>
                `;
            } else {
                alert('Trailer not available.');
            }
        })
        .catch(error => console.error('Error fetching movie trailer:', error));
}

document.getElementById('clearWatchlist').addEventListener('click', () => {
    localStorage.removeItem('watchlist');

    const watchlistContainer = document.getElementById('watchlistContainer');
    watchlistContainer.innerHTML = '<p>No movies in your watchlist.</p>'; 

    alert("Watchlist cleared!");
});




const ham = document.getElementById('ham');
const resnav = document.getElementById('resnav');
const closeBtn = document.getElementById('resbtn');


ham.addEventListener('click', () => {
  resnav.classList.add('active');
});


closeBtn.addEventListener('click', () => {
  resnav.classList.remove('active');
});