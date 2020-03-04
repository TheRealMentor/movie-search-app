$(document).ready(() => {
  $("#searchForm").on("submit", (e) => {
    e.preventDefault();

    let searchText = $('#searchText').val();

    getMovies(searchText);
    
  });
});

const API_KEY = "<your-api-key>";

function getMovies(searchText) {
  axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=`+searchText)
  .then((response) => {
    console.log(response);
    let movies = response.data.Search;
    let output = '';
    $.each(movies, (index, movie) => {
      output += `
        <div class="col-md-3 mb-4">
          <div class="well text-center bg-primary">
            <img src="${movie.Poster}"/>
            <p class="mt-3 text-white">${movie.Title}</p>
            <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-info" href="#">Movie Details</a>
          </div>
        </div>
      `;
    });

    $('#movies').html(output);

  }).catch((error) => {
    console.log(error);
  });
}

function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem('movieId');

  axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&i=`+movieId)
  .then((response) => {
    console.log(response);
    let movie = response.data;

    let output = `
      <div class="row mt-3 p-4 bg-primary text-white">
        <div class="col-md-4">
          <img src="${movie.Poster}" class="thumbnail mx-auto d-block">
        </div>
        <div class-"col-md-8">
          <h2 class="text-white">${movie.Title}</h2>
          <ul class="list-group border-light">
            <li class="list-group-item active"><strong>Genre:</strong> ${movie.Genre}</li>
            <li class="list-group-item active"><strong>Released:</strong> ${movie.Released}</li>
            <li class="list-group-item active"><strong>Rated:</strong> ${movie.Rated}</li>
            <li class="list-group-item active"><strong>IMDb Rating:</strong> ${movie.imdbRating}</li>
            <li class="list-group-item active"><strong>Director:</strong> ${movie.Director}</li>
            <li class="list-group-item active"><strong>Writer:</strong> ${movie.Writer}</li>
            <li class="list-group-item active"><strong>Actors:</strong> ${movie.Actors}</li>
          </ul>
        </div>
      </div>
      <div class="row p-5 bg-primary text-white">
        <div class="well">
          <h3 class="text-white">Plot</h3>
          ${movie.Plot}
          <hr>
          <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" rel="noopener noreferrer" class="btn btn-info mr-3">View on IMDb</a>
          <a href="index.html" class="btn btn-outline-danger">Go Back</a>
        </div>
      </div>
    `;

    $('#movie').html(output);

  }).catch((error) => {
    console.log(error);
  });


}