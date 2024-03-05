let textEl = document.querySelector("#inp");
let textEk = document.querySelector("#ek");
let siralaEl = document.querySelector("#sirala");
let terssiralaEl = document.querySelector("#terssirala");
let ilksilEl = document.querySelector("#ilksil");
let sonsilEl = document.querySelector("#sonsil");
let hepsinisilEl = document.querySelector("#hepsinisil");
let calkalaEl = document.querySelector("#calkala");
let sonucEl = document.querySelector("#sonuc");

let arr = [];

let ekle = () => {
  if (textEl.value == "") {
    alert("Please Enter Your Text");
    return;
  }
  /* push=ekle */
  arr.push(textEl.value);
  console.log(arr);
  sonucEl.innerHTML = `Girdiğiniz Array: ${arr}`;
  textEl.value = "";
};

let sirala = () => {
  let newArr = arr.sort();
  sonucEl.innerHTML = `Girmiş olduğunuz Array: ${arr} <br>  Sıralanmış Array: ${newArr}`;
};

let tersSirala = () => {
  let newArr = arr.reverse();
  sonucEl.innerHTML = `Girdiğiniz Array: ${arr} <br>  Ters Sıralanmış Array: ${newArr}`;
};

let sonSil = () => {
  let newArr = arr.pop();
  sonucEl.innerHTML = `Girdiğiniz Array: ${arr} <br>  Son Silinen Elaman: ${newArr}`;
};

let ilkSil = () => {
  let newArr = arr.shift();
  sonucEl.innerHTML = `GirdiğinizArray: ${arr} <br>  Ilk Silinen Eleman: ${newArr}`;
};

let hepsiniSil = () => {
  // 0ile arr.length içindekileri içini bosaltma
  let newArr = arr.splice(0, arr.length);
  sonucEl.innerHTML = `  Hepsini Sildiğiniz Array: ${newArr}`;
};
let karistir = () => {
  // Orijinal diziyi kopyala
  let newArr = arr.slice();

  // Karıştırma işlemi
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  sonucEl.innerHTML = `Girdiğiniz Array: ${arr} <br>  Karıştırılan Array: ${newArr}`;
};
