// URLAPI
const URLDetail = "?api_key=3b0c7bd2453a463c1077f77f3e23aa0a&language=en-US";
const PreURlDetail = "https://api.themoviedb.org/3/movie/";
const urlHtml = window.location;
const idMovie = urlHtml.search.substring(1);
const URLDetail2 = PreURlDetail + idMovie + URLDetail;
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const APIGetMovie = PreURlDetail + idMovie + "/videos" + URLDetail;
console.log("APIGetMovie", PreURlDetail + idMovie + "/videos" + URLDetail);
const UrlYoutube = "https://www.youtube.com/embed/";
// Get Element
let posterPath = document.getElementById("posterPath");
let originalTitle = document.getElementById("originalTitle");
let overView = document.getElementById("overView");
let releaseDate = document.getElementById("releaseDate");
let genres = document.getElementById("genres");
let imgCompany = document.getElementById("imgCompany");
let trailer = document.getElementById("trailer");
let iframeTrailer = document.getElementById("iframe");
//
async function getDetailMovie(URLDetail2) {
  const resp = await fetch(URLDetail2);
  const respData = await resp.json();
  console.log("URLDetail2", respData);
  return respData;
}
async function getDetailTrailerMovie(APIGetMovie) {
  const resp = await fetch(APIGetMovie);
  const respData = await resp.json();
  console.log("trailer", respData);
  return respData;
}
async function Dom() {
  let data = await getDetailMovie(URLDetail2);
  let dataTrailer = await getDetailTrailerMovie(APIGetMovie);
  console.log("data", data);
  console.log("trailer data", dataTrailer);
  console.log("trailer data result", dataTrailer.results[0].key);
  let keyTrailer = dataTrailer.results[0].key;
  iframeTrailer.src = UrlYoutube + keyTrailer;
  // iframeTrailer.src = UrlYoutube + keyTrailer;
  console.log("url Youtube", UrlYoutube + keyTrailer);
  posterPath.src = IMGPATH + data.poster_path;
  originalTitle.innerHTML = data.original_title;
  genres.innerHTML = "Genres: " + GenresString(data);
  releaseDate.innerHTML = "Release date: " + data.release_date;
  overView.innerText = data.overview;
  console.log(data.production_companies);
  console.log("array IMG", productionCompaniesImage(data));
  productionCompaniesImage(data).forEach((img_Company) => {
    const divImgCompany = document.createElement("div");
    divImgCompany.classList.add("imgCompany");
    divImgCompany.innerHTML = `
    <img
        src="${IMGPATH + img_Company}"
        srcset=""
    />`;
    console.log(IMGPATH + img_Company);
    imgCompany.appendChild(divImgCompany);
  });
}
Dom();

function GenresString(data) {
  let genresString = data.genres;
  genresString = genresString.map((name) => name.name).join(", ");
  return genresString;
}

function productionCompaniesImage(data) {
  let arrayImage;
  arrayImage = data.production_companies.map((img) => img.logo_path);
  return arrayImage;
}

function imageCompany(arrayImageCompany) {
  let img = "";
  arrayImageCompany.forEach((img_Company) => {
    const divImgCompany = document.createElement("div");
    divImgCompany.classList.add("imgCompany");
    divImgCompany.innerHTML = `
    <img
        src="${IMGPATH + img_Company.logo_path}"
        srcset=""
    />`;
  });
}
const toggle = () => {
  trailer.classList.toggle("active");
};
