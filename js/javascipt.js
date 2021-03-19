//TODO URL API
const APIURL =
  "https://api.themoviedb.org/3/movie/popular?api_key=3b0c7bd2453a463c1077f77f3e23aa0a&language=en-US&page=";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHURL =
  "https://api.themoviedb.org/3/search/movie?api_key=3b0c7bd2453a463c1077f77f3e23aa0a&language=en-US&query=";
const NotAdult = "&include_adult=false";
// TODO DOM
const main = document.getElementById("main");
const form = document.getElementById("form");
const form1 = document.getElementById("form1");
const search = document.getElementById("search");
const pageNum = document.getElementById("pageNum");
// TODO Create HTML
getMovie(APIURL);
async function getMovie(url) {
  const resp = await fetch(url);
  const respData = await resp.json();
  ShowMovie(respData);
  console.log(respData);
}
getMovie();

function ShowMovie(respData) {
  main.innerHTML = "";
  respData.results.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
      <a href="detail.html?${movie.id}">
         <img
        src="${IMGPATH + movie.poster_path}"
        alt="${movie.title}"
        srcset=""
      />
      </a>
      <div class="movie_info">
        <h3>${movie.original_title}</h3>
        <span class="${getClassByVote(movie.vote_average)}"
          >${movie.vote_average}</span
        >
      </div>
      <div class="overview">
        <h3>Overview:</h3>
        ${movie.overview}
      </div>
    `;
    main.appendChild(movieEl);
  });
  return respData;
}

// TODO VOTE
function getClassByVote(vote) {
  if (vote > 8) {
    return "green";
  }
  if (vote >= 5) {
    return "orange";
  }
  return "red";
}
// TODO Nhập input Search
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputSearch = search.value;
  if (inputSearch) {
    getMovie(SEARCHURL + inputSearch + NotAdult);
    search.value = "";
  } else {
    getMovie(APIURL);
  }
});
// TODO Nhập INput Page
form1.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputPage = pageNum.value;
  if (inputPage) {
    getMovie(APIURL + inputPage);
    pageNum.value = "";
  } else {
    getMovie(APIURL + 1);
  }
});
