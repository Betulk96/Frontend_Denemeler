const API_BASE_URL = "https://api.tvmaze.com/";
const sectionCard = document.getElementById("sectionCard");
const txtSearch = document.getElementById("txtSearch");
const btnSearch = document.getElementById("btnSearch");
const btnHome = document.getElementById("BtnHome");
const categorys = document.getElementById("category");
const btnJapanese = document.getElementById("btnJapanese");
const btnAnimation = document.getElementById("btnAnimation");
const btnMost = document.getElementById("btnMost");
const movieContent = document.getElementById("movieContent");

const loadMovies = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}shows`);
    //console.log(res);
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
      <div class="card movie-card h-100 position-relative" data-id="${id}">
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
btnHome.addEventListener("click", () => {
  movieContent.innerHTML = ""; // movieContent içeriğini temizle
  renderMovies(); // renderMovies fonksiyonunu çağır
});

btnJapanese.addEventListener("click", async () => {
  movieContent.innerHTML = "";
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
  movieContent.innerHTML = "";
  setLoaderVisibility("show");
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
  movieContent.innerHTML = "";
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
      movieContent.innerHTML = "";
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
const loadMovieById = async (id) => {
  try {
    const movies = await loadMovies(); // Tüm filmleri yükle
    console.log(movies);
    const movie = movies.find((movie) => movie.id === parseInt(id)); // İstenen id'ye sahip filmi bul
    return movie ? movie : null; // Film bulunduysa döndür, bulunamadıysa null döndür
  } catch (error) {
    console.error("Error loading movie by ID:", error);
    return null;
  }
};
const showCast = async (q) => {
  try {
    const res = await axios(`${API_BASE_URL}shows/${q}/cast`);
    return res.data;
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};

const showCrew = async (q) => {
  try {
    const res = await axios(`${API_BASE_URL}shows/${q}/crew`);
    return res.data;
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};
const setMovie = cardContainer.addEventListener("click", async (e) => {
  const idData = e.target.closest(".movie-card").dataset.id;
  //console.log(idData);

  if (!idData) return;

  try {
    setLoaderVisibility("show");
    const movie = await loadMovieById(idData); // Belirli bir filmi yükle
    console.log(movie, 1);
    const {
      id,
      image,
      name,
      schedule,
      rating,
      network,
      summary,
      language,
      genres,
    } = movie;

    setLoaderVisibility("show");
    const cast = await showCast(idData); // Belirli bir filmi yükle
    console.log(cast, 3);
    const characterNames = cast
      .slice(0, 5)
      .map((item) => item.character.name)
      .join(", ");

    setLoaderVisibility("show");
    const crew = await showCrew(idData);
    console.log(crew, 4);
    const creatorNames = crew
      .filter((member) => member.type === "Creator")
      .map((member) => member.person.name)
      .join(", "); // Creator isimlerini birleştir
    console.log(creatorNames);

    if (movie) {
      sectionCard.innerHTML = "";
      movieContent.innerHTML = createContent(
        movie,
        characterNames,
        creatorNames
      ); // Film içeriğini oluşturup ekrana yazdır
    } else {
      movieContent.innerHTML = `<div class="alert alert-danger">Movie not found</div>`; // Film bulunamadıysa hata mesajı göster
    }

    setLoaderVisibility("hide");
  } catch (error) {
    console.error("Error loading and displaying movie:", error);
  }
});

const createContent = (movie, characterName, creatorName) => {
  // Parametre adı cast'ten movie olarak değiştirildi
  const {
    id,
    image,
    name,
    schedule,
    rating,
    network,
    summary,
    language,
    genres,
  } = movie;

  return ` <div class="container">
   <nav class="container titleContent d-flex justify-content-between  " data-id="${id}">
  <div class="leftHeader">
    <h1>${name}</h1>
  </div>
  <div class="rightHeader mt-2 ">
    <button class="btn ">${rating.average} </button>
    <button class="btn ">${network.country.code} </button>
    
  </div>
</nav>
<nav 
  class="container imgSummaryContent d-flex justify-content-between  mt-2 "
>
  <section class="imgContent col-3">
    <img
    src="${image.original}"
    alt="${image.original}" style="width: 90%;">
  </section>
  <section class="summaryContent col-9">
    <p class="text-start">${summary}</p>    
    
    <table>
      <tbody class="t">
        <tr>
          <td>Direction</td>
          <td><span>${creatorName}</span></td>
        </tr>
        <tr>
          <td>Days</td>
          <td><span>${schedule.days}</span></td>
        </tr>
        <tr>
          <td>Channel</td>
          <td><span>${network.name} </span></td>
        </tr>
        <tr>
          <td>Language</td>
          <td><span>${language}</span></td>
        </tr>
        <tr>
          <td>Category</td>
          <td>
            <span>${genres} </span>
          </td>
        </tr>
        <tr>
          <td>Cast</td>
          <td>${characterName}</td>
        </tr>
      </tbody>
    </table>
  </section>
</nav>
</div>`;
};
