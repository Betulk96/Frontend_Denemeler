import { desserts } from "/Bootstrap-WebP/assets/js/desserts.js";
console.log(desserts);
//elemanları getireceğimiz yer
const offCanvasBody = document.querySelector(".btn-container-offcanvas");
//butonların olacağı yer
const btnContainer = document.querySelector(".offcanvas-button");

//sayfa yüklendiğinde bu iki fonksiyon çalışsın
window.addEventListener("DOMContentLoaded", function () {
  displayOffcanvasItems(desserts); //json dosyasından verileri alıp ekrana getirir
  displayOffcanvasButtons();
});

function displayOffcanvasItems(menuItems) {
  let displayMenu = menuItems.map((item) => {
    console.log(item);

    return `<div class="card mb-3" style="max-width: 540px; ">
      <div class="row g-0">
        <div class="col-md-4 ">
          <img src="/Bootstrap-WebP/assets/img/pexels-anna-tukhfatullina-food-photographerstylist-2638026.jpg" class="img-fluid rounded-start h-100 "  alt="${item.baslik}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${item.baslik}</h5>
            <h6 class="card-title">${item.ulke}</h6>
            <p class="card-text">${item.acıklama}</p>
            <input type="button" value="Tarif " class="btn btn-danger " />
          </div>
        </div>
      </div>
    </div>`;
  });
  displayMenu = displayMenu.join("");
  //console.log(displayMenu);

  offCanvasBody.innerHTML = displayMenu;
}
//butonları ekrana getirecek fonksiyon
const displayOffcanvasButtons = () => {
  //json dosyamızda olan kategori isimleri bir değer olacak şekilde alıcaz
  const categories = desserts.reduce(
    (values, item) => {
      //values=mevcut olan dizi
      //item=her bir eleman
      if (!values.includes(item.kategori)) {
        //eğer dizide yoksa ekle
        values.push(item.kategori);
      }
      return values;
    },
    ["all"] //tüm dessert öğelerini görmesine olanak tanır.
  );
  console.log(categories);
  //categories dizisinde bulunan her bir kategori için bir düğme oluşturma
  const categoryBtns = categories
    .map((category) => {
      return `<button
        class="btn  filter-btn  text-uppercase m-1  "
        type="button"       
        data-bs-target="#"
        data-id="${category}"
        aria-controls=""
      >${category}</button>
        `;
    })
    .join(""); //aralarına birşey eklemiyoruz yan yana duracaklar
  // Butonları offcanvas başlık bölgesine ekleme
    btnContainer.innerHTML = categoryBtns;
    
  const filterBtns = btnContainer.querySelectorAll(".filter-btn");
  console.log(filterBtns);
  //filter-btnlerin herhangi birini tıkladığımızda ekrana getirecek fonksiyon
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        
        
      const category = e.currentTarget.dataset.id;
      let menuCategory;

      if (category === "all") {
        menuCategory = desserts; // Tüm kategorileri göstermek isteniyorsa, tüm desserts dizisi kullanılır.
      } else {
        menuCategory = desserts.filter((item) => item.kategori === category); // Belirli bir kategoriye göre filtreleme yapılır.
      }

      displayOffcanvasItems(menuCategory); // Filtrelenmiş menü öğeleri ekrana getirilir.
    });
  });
};
