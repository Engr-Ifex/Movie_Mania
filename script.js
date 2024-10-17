const container = document.getElementById('container');
const title = document.getElementById('title');
const API_KEY = '8414c7fb9625be12b92527710f830449';
const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=1`;


fetch(API_URL)
 .then(response => {
    if(!response.ok){
        throw new Error('Network response not ok')
    }
    return response.json();
 })
 .then(data => {
    console.log('discover', data.results);
    displayMovies(data.results)
 })
 .catch(error => {
    console.error('Error in fetching movie', error)
 })

function displayMovies(movies){
    container.innerHTML = movies.map(movie =>
        `
        <div id="container">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="">
        </div>

        `
    ).join('');
}

// function displayMovies(movies){
//     title.innerHTML = movies.map(movie => `
//         <div id="title">
//         <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="">
//         </div>
//         `).join('')
// }