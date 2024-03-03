const API_BASE_URL = "https://api.tvmaze.com/";
const sectionCard = document.getElementById("sectionCard");
const txtSearch = document.getElementById("txtSearch");
const btnSearch = document.getElementById("btnSearch");
const btnHome = document.getElementById("BtnHome");
const categorys=document.getElementById("categorys")

const loadMovies = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}shows`);
    return res.data.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error("Error loading movies:", error);
    return [];
  }
};
//filmeleri yükleme
const renderMovies = async () => {
  sectionCard.innerHTML = ""; // Önceki içeriği temizle

  try {
    const movies = await loadMovies();
    let strShows = "";
    if (movies.length <= 0) {
      strShows = `<div class="alert alert-danger">No show was found</div>`;
    } else {
      movies.forEach((item) => {
        const { id, image, name, schedule } = item;

        strShows += `<div class="col ">
            <div  class="card h-100 g-5" data-id="${id}">
              <img
              src="${image.original}"
                class="card-img"
                alt="..."
                style="width: auto; height: 300px"
              />
  
              <div
                class="card-img-overlay d-flex flex-column justify-content-end align-items-start"
              >
                <h5 class="card-title">${name}</h5>
                <p class="card-text"><small>Days : ${schedule.days}</small>-<small>Time : ${schedule.time}</small></p>
              </div>
            </div>
          </div>`;
      });
    }
    sectionCard.innerHTML = strShows;
  } catch (error) {
    console.error("Error loading and displaying movies:", error);
  }
};
// sayfa yüklendiğinde sıralı bir şekilde gelsin
document.addEventListener("DOMContentLoaded", renderMovies);

// BtnHome tıklandığında da sıralı bir düzeyde gelsin
btnHome.addEventListener("click", renderMovies);

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
    const shows = await searchShows(q);
    let strShows = "";

    if (shows.length <= 0) {
      strShows = `<div class="alert alert-danger">No show was found</div>`;
    } else {
      shows.forEach((item) => {
        const { id, image, name, schedule } = item.show; //API den show atltında geliyor hepsi

        strShows += `<div class="col ">
              <div  class="card h-100 g-5-" data-id="${id}">
                <img
                src="${image.original}"
                  class="card-img"
                  alt="..."
                  style="width: auto; height: 400px"
                />
    
                <div
                  class="card-img-overlay d-flex flex-column justify-content-end align-items-start"
                >
                  <h5 class="card-title">${name}</h5>
                  <p class="card-text"><small>Days : ${schedule.days}</small>-<small>Time : ${schedule.time}</small></p>
                </div>
              </div>
            </div>`;
      });
    }
    sectionCard.innerHTML = strShows;
  } catch (error) {
    console.error("Error loading and displaying movies:", error);
  }
});

const setCategories=()=>{
    let allCategories = data.map((item) => item.genres)
    let filteredCategories = [...new Set(allCategories)]
    console.log(filteredCategories)

}
setCategories
