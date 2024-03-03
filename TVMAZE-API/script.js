const API_BASE_URL = "https://api.tvmaze.com/";
const sectionCard = document.getElementById("sectionCard");
const txtSearch = document.getElementById("txtSearch");
const btnSearch = document.getElementById("btnSearch");
const btnHome = document.getElementById("BtnHome");
const categorys = document.getElementById("category");
const btnJapanese = document.getElementById("btnJapanese");
const btnAnimation = document.getElementById("btnAnimation");
const btnMost = document.getElementById("btnMost");

const loadMovies = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}shows`);
    console.log(res);
    return res.data.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error("Error loading movies:", error);
    return [];
  }
};
const setLoaderVisibility = (state) => {
  if (state === "show") {
    loader.classList.remove("d-none");
  } else {
    loader.classList.add("d-none");
  }
};
//filmeleri yükleme
const renderMovies = async () => {
  sectionCard.innerHTML = ""; // Önceki içeriği temizle

  try {
    setLoaderVisibility("show");
    const movies = await loadMovies();
    let strShows = "";
    if (movies.length <= 0) {
      strShows = `<div class="alert alert-danger">No show was found</div>`;
    } else {
      movies.forEach((item) => {
        strShows += createCard(item);
      });
    }
    sectionCard.innerHTML = strShows;
    setLoaderVisibility("hide");
  } catch (error) {
    console.error("Error loading and displaying movies:", error);
  }
};

const renderMoviesBySelect = (movies) => {
  sectionCard.innerHTML = ""; // Önceki içeriği temizle

  let strShows = "";
  movies.forEach((item) => {
    strShows += createCard(item);
  });

  sectionCard.innerHTML = strShows;
};
const createCard = (item) => {
  const { id, image, name, schedule, rating } = item;
  return `<div class="col-lg-3">
      <div class="card h-100 position-relative" data-id="${id}">
      <h3 class="cardRating fs-5 position-absolute top-0 end-0">${rating.average}</h3>
          <img
              src="${image.original}"
              class="card-img"
              alt="..."
              style="width:100%; height: 100%; object-fit: cover;"
          />

          <div
              class="card-img-overlay d-flex flex-column justify-content-end align-items-start p-0 m-0"
          >
         

          <div class="cardBody">
          <h5 class="card-title fs-5">${name}</h5>
                  <p class="card-text "><small>Days : ${schedule.days}</small> <small>Time : ${schedule.time}</small></p>
        </div>
              
            
          </div>
      </div>
  </div>`;
};

// sayfa yüklendiğinde sıralı bir şekilde gelsin
document.addEventListener("DOMContentLoaded", renderMovies);

// BtnHome tıklandığında da sıralı bir düzeyde gelsin
btnHome.addEventListener("click", renderMovies);

btnJapanese.addEventListener("click", async () => {
  setLoaderVisibility("show");
  const data = await loadMovies();
  /*
  const languages = data.map((item) => item.language);
  console.log(languages)
  const filteredLanguages = [...new Set(languages)];
  console.log(filteredLanguages); */
  let filteredMovies = data.filter((item) => item.language === "Japanese");

  if (filteredMovies.length > 0) {
    console.log("Japanese filmler bulundu.");
    setLoaderVisibility("hide");
    renderMoviesBySelect(filteredMovies);
  } else {
    console.log("Japanese filmler bulunamadı.");
  }
});
btnAnimation.addEventListener("click", async () => {
  setLoaderVisibility;
  const data = await loadMovies();
  /* const type = data.map((item) => item.type);
  const filteredType = [...new Set(type)];
  console.log(filteredType);//(5) ['Scripted', 'Reality', 'Animation', 'Talk Show', 'Documentary'] */
  let filteredMovies = data.filter((item) => item.type === "Animation");
  if (filteredMovies.length > 0) {
    console.log("Altyazılı filmler bulundu.");
    setLoaderVisibility("hide");
    renderMoviesBySelect(filteredMovies);
  } else {
    console.log("Altyazılı filmler bulunamadı.");
  }
});

btnMost.addEventListener("click", async () => {
  setLoaderVisibility("show");
  const data = await loadMovies();
  const rating = data.filter((item) => item.rating.average > 8);
  if (rating.length > 0) {
    console.log("En yüksek puanlı filmler bulundu.");
    setLoaderVisibility("hide");
    renderMoviesBySelect(rating);
  } else {
    console.log("En yüksek puanlı filmler bulunamadı.");
  }
});

//ismi verilen diziyi getirme
const searchShows = async (q) => {
  try {
    const res = await axios(`${API_BASE_URL}search/shows?q=${q}`);
    return res.data;
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};
btnSearch.addEventListener("click", async (e) => {
  try {
    const q = txtSearch.value;
    setLoaderVisibility("show");
    const shows = await searchShows(q);
    let strShows = "";

    if (shows.length <= 0) {
      strShows = `<div class="alert alert-danger">No show was found</div>`;
    } else {
      shows.forEach((item) => {
        strShows += createCard(item.show);
      });
    }
    setLoaderVisibility("hide");
    sectionCard.innerHTML = strShows;
  } catch (error) {
    console.error("Error loading and displaying movies:", error);
  }
});

const setCategories = async () => {
  try {
    const data = await loadMovies();
    let allGenres = data.map((item) => item.genres).flat(); //flat ile iç içe geçmiş olanları düzleştiriyor.tüm kategorileri alabilmek
    //console.log(allGenres);
    let filteredGenres = [...new Set(allGenres)];
    //console.log(filteredGenres)//22 tane farklı kategori vardır

    categorys.innerHTML = filteredGenres
      .map(
        (genre) =>
          `<a href="#" class="category-link text-decoration-none" data-genre="${genre}">
                     <h2 class=>${genre}</h2>
                 </a>`
      )
      .join("");

    // Kategori bağlantılarına tıklama olayı ekleyin
    categorys.addEventListener("click", (e) => {
      let selectedGenre = e.target.textContent;
      console.log(selectedGenre);
      // loadMovies fonksiyonu ile filmleri yükle
      loadMovies()
        .then((data) => {
          // loadMovies fonksiyonundan gelen veriler içinde tıklanan kategoriye sahip film var mı kontrol et
          const filteredMovies = data.filter((movie) =>
            movie.genres.includes(selectedGenre)
          );

          // Eğer tıklanan kategoriye sahip film varsa
          if (filteredMovies.length > 0) {
            console.log(
              `"${selectedGenre}" kategorisine ait filmler bulunuyor.`
            );
            renderMoviesBySelect(filteredMovies);
          } else {
            console.log(`"${selectedGenre}" kategorisine ait film bulunamadı.`);
          }
        })
        .catch((error) => {
          console.error("Error loading movies:", error);
        });
    });
  } catch (error) {
    console.error("Error loading and displaying movies:", error);
  }
};

setCategories();
