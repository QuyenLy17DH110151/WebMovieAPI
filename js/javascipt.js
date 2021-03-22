//TODO URL API
const APIURL =
  "https://api.themoviedb.org/3/movie/popular?api_key=3b0c7bd2453a463c1077f77f3e23aa0a&language=en-US&page=";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHURL =
  "https://api.themoviedb.org/3/search/movie?api_key=3b0c7bd2453a463c1077f77f3e23aa0a&language=en-US&query=";
const NotAdult = "&include_adult=false";
let PageNum = 0;
let NewURL = "";
let SEARCHURLNEW = "";
// TODO DOM
const main = document.getElementById("main");
const form = document.getElementById("form");
const form1 = document.getElementById("form1");
const search = document.getElementById("search");
const pageNum = document.getElementById("pageNum");
// TODO Create HTML
// getMovie(APIURL);

async function getMovie(url) {
  const resp = await fetch(url);
  let respData = await resp.json();
  console.log(respData.page);
  PageNum = respData.page;
  return respData;
}
ShowMovie();
async function ShowMovie() {
  let respData = await getMovie(APIURL);
  if (NewURL != "") {
    respData = await getMovie(NewURL);
    NewURL = "";
  }
  console.log("data", respData);
  ShowPage(respData.page);
  main.innerHTML = "";
  if (respData.errors != null) {
    location.href = "error.html";
  }
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
  console.log(inputSearch);
  if (inputSearch) {
    // console.log("search", SEARCHURL + inputSearch + NotAdult);
    // getMovie(SEARCHURL + inputSearch + NotAdult);
    NewURL = SEARCHURL + inputSearch + NotAdult;
    ShowMovie();
    search.value = "";
  }
});
// TODO Nhập INput Page
form1.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputPage = pageNum.value;
  if (inputPage) {
    NewURL = APIURL + inputPage;
    ShowMovie();
    pageNum.value = "";
  } else {
    ShowMovie();
  }
});
function Popular() {
  NewURL =
    "https://api.themoviedb.org/3/movie/popular?api_key=3b0c7bd2453a463c1077f77f3e23aa0a&language=en-US&page=";
  console.log("Popular", APIURL);
  ShowMovie();
}
function TopRated() {
  NewURL =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=3b0c7bd2453a463c1077f77f3e23aa0a&language=en-US&page=";
  console.log("TopRated", APIURL);
  ShowMovie();
}
function Upcoming() {
  NewURL =
    "https://api.themoviedb.org/3/movie/upcoming?api_key=3b0c7bd2453a463c1077f77f3e23aa0a&language=en-US&page=";
  console.log("APIURL");
  ShowMovie();
}
function ShowPage(numPage) {
  let numberPage = document.getElementById("NumberPage");
  numberPage.innerHTML = `Page : ${numPage}`;
  console.log("numPage", numPage);
}
async function NextPage() {
  // let respData = await getMovie(APIURL);
  // let count = respData.page;
  NewURL = APIURL + (PageNum + 1);
  getMovie(NewURL);
  // console.log("NewURL", NewURL, APIURL, respData.page);
  // console.log("pageNum", respData.page);
  ShowMovie();
  // NewURL = "";
}
function BackPage() {
  NewURL = APIURL + (PageNum + -1);
  getMovie(NewURL);
  ShowMovie();
}
