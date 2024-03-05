let nameEl = document.getElementById("txtName");
let pointEl = document.getElementById("txtPoint");
let buttonEl = document.getElementById("btnAdd");
let avgEl = document.getElementById("avg");

let tbodyEl = document.querySelector("tbody");

buttonEl.addEventListener("click", () => {
  let name = nameEl.value.toUpperCase();
    let point = pointEl.value;
    if (name === "" || point === "") {
        alert("Please enter name and point");
        return;
    }

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

  
  console.log(name, point);
  deleteStudents();
    avgEl.innerText = average(tbodyEl);
    correctionStudents(name, point, selectEl,tbodyEl);
});

const addWriteDelButtonInSelect = (selectEl) => {
  selectEl.innerHTML += `<td class="firstButton">
      <button class="btn btn-primary"
              id="btnPencil">
        <i class="bi bi-pencil"></i>
      </button>
      <button class="btn btn-danger"
               id="btnDelete"   >
        <i class="bi bi-trash"></i>
      </button>
    </td>`;
};

const changeButton = (selectEl) => {
  selectEl.innerHTML += `<td class="secondButton">
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
const correctionStudents = (name, point, selectEl,tbodyEl) => {
  document.querySelectorAll("#btnPencil").forEach((item, index) => {
    item.addEventListener("click", (e) => {
      //düzeltmeyi etkn hale getir
      let nameElement = e.target.closest("tr").children[1];
      nameElement.setAttribute("contenteditable", true);
      let pointElement = e.target.closest("tr").children[2];
        pointElement.setAttribute("contenteditable", true);
        if (!nameElement || !pointElement) return;
      // Düğmelerin yerini değiştir
      selectEl.innerHTML = "";
      changeButton(selectEl);

      let originalName = nameElement.innerText;
      let originalPoint = pointElement.innerText;

      //eğer check basarsa girdiği değeri al ve onu name ve point ile değiştir
      document.querySelectorAll("#btnCheck").forEach((item) => {
        item.addEventListener("click", (e) => {
          // Yeni değerleri al
          let newName = nameElement.innerText;
          let newPoint = pointElement.innerText;
          // Verileri güncelle
          name = newName;
          point = newPoint;
          // contenteditable'ı güncelle
          nameElement.setAttribute("contenteditable", false);
          pointElement.setAttribute("contenteditable", false);

          console.log(name, point);
          // Düğmelerin yerini değiştir
          selectEl.innerHTML = "";
            addWriteDelButtonInSelect(selectEl);
            correctionStudents(name, point, selectEl, tbodyEl);
            deleteStudents();

            avgEl.innerText = average(tbodyEl);
            
        });
      });

      //eğer x basarsa eski değere geri dönsün
      document.querySelectorAll("#btnCancel").forEach((item) => {
        item.addEventListener("click", (e) => {
          nameElement.setAttribute("contenteditable", false);
          pointElement.setAttribute("contenteditable", false);
          nameElement.innerText = originalName;
          pointElement.innerText = originalPoint;
          selectEl.innerHTML = "";
          addWriteDelButtonInSelect(selectEl);
          correctionStudents(name, point, selectEl, tbodyEl);
          deleteStudents();
        });
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

const average = (tbodyEl) => {
  let sum = 0;
  let rowCount = tbodyEl.children.length; // Tablodaki satır sayısını al
  for (let i = 0; i < rowCount; i++) {
    let point = parseFloat(tbodyEl.children[i].children[2].innerText); // Satırdaki puanı al
    sum += point; // Toplamı güncelle
  }
  return (sum / rowCount).toFixed(2); // Ortalamayı hesapla ve geri dön
};
