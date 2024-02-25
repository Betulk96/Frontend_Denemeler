let nameEl = document.getElementById("txtName");
let pointEl = document.getElementById("txtPoint");
let buttonEl = document.getElementById("btnAdd");

let tbodyEl = document.querySelector("tbody");

buttonEl.addEventListener("click", () => {
  let name = nameEl.value.toUpperCase();
  let point = pointEl.value;

  let trEl = document.createElement("tr");

  let idEl = document.createElement("td");
  idEl.innerHTML = tbodyEl.children.length + 1;

  let tdNameEl = document.createElement("td");
  tdNameEl.innerText = name;

  let tdPointEl = document.createElement("td");
  tdPointEl.innerText = point;

  let selectEl = document.createElement("td");
  addWriteDelButtonInSelect(selectEl);

  trEl.appendChild(idEl);
  trEl.appendChild(tdNameEl);
  trEl.appendChild(tdPointEl);
  trEl.appendChild(selectEl);

  tbodyEl.appendChild(trEl);

  nameEl.value = "";
  pointEl.value = "";
  nameEl.focus();

  correctionStudents(name, point, selectEl);
  deleteStudents();
});

const addWriteDelButtonInSelect = (selectEl) => {
  selectEl.innerHTML += `<td>
      <button class="btn btn-primary"
              id="btnCorrection">
        <i class="bi bi-pencil"></i>
      </button>
      <button class="btn btn-danger"
               id="btnDelete"   >
        <i class="bi bi-trash"></i>
      </button>
    </td>`;
};

const changeButton = (selectEl) => {
  selectEl.innerHTML += `<td>
      <button class="btn btn-success"
              id="btnCheck">
        <i class="bi bi-check-lg"></i>
      </button>
      <button class="btn btn-danger"
               id="btnCancel"   >
        <i class="bi bi-x"></i>
      </button>
    </td>`;
};
const correctionStudents = (name, point, selectEl) => {
  document.querySelectorAll("#btnCorrection").forEach((item) => {
    item.addEventListener("click", (e) => {
      let nameElement = e.target.closest("tr").children[1];
      nameElement.setAttribute("contenteditable", true);
      nameElement.classList.add("bg-warning");

      let pointElement = e.target.closest("tr").children[2];
      pointElement.setAttribute("contenteditable", true);
      pointElement.classList.add("bg-warning");

        let originalName = nameElement.innerText;
        console.log(originalName);
      let originalPoint = pointElement.innerText;

      selectEl.innerHTML = "";
      changeButton(selectEl);

      let btnCancel = selectEl.querySelector("#btnCancel");
      let btnCheck = selectEl.querySelector("#btnCheck");

      btnCancel.addEventListener("click", () => {
        // İptal edildiğinde orijinal verilere geri dön
        nameElement.innerText = originalName;
        pointElement.innerText = originalPoint;

        // Diğer düzenlemeleri geri al
        nameElement.removeAttribute("contenteditable");
        nameElement.classList.remove("bg-warning");
        pointElement.removeAttribute("contenteditable");
        pointElement.classList.remove("bg-warning");

        // Düğmeleri eski hallerine geri getir
        selectEl.innerHTML = "";
        addWriteDelButtonInSelect(selectEl);
      });

      btnCheck.addEventListener("click", () => {
        // Verileri güncelle

        updateData(nameElement.innerText, pointElement.innerText);

        console.log.alert("Data updated!");

        // Düğmeleri eski hallerine geri getir
        selectEl.innerHTML = "";
        addWriteDelButtonInSelect(selectEl);
      });
    });
  });
};
const deleteStudents = () => {
  //bütün btnDelete butonların tıklandında çalışacak fonksiyon.hepsine tek tek eklediği
  document.querySelectorAll("#btnDelete").forEach((item) => {
    item.addEventListener("click", (e) => {
      let name = e.target.closest("tr").children[1].innerText;
      console.log(name);

      const result = confirm(`Are you sure you want to delete ${name}?`);
      console.log(result);

      if (result) {
        e.target.closest("tr").remove();
      }
    });
  });
};

const average = () => {};
