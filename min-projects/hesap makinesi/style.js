let expression = ''; // Hesaplama ifadesi

// Butona tıkladığında ifadeyi güncelleme fonksiyonu
function appendToExpression(value) {
  expression += value; // Buton değerini ifadeye ekle
  calculate(); // Hesaplamayı yeniden yap
}

// Hesaplama fonksiyonu
function calculate() {
  const resultElement = document.getElementById('sonuc');
  try {
    const result = eval(expression); // eval fonksiyonu ile ifadeyi hesapla
    resultElement.innerText = 'Sonuç: ' + result;
  } catch (error) {
    resultElement.innerText = 'Hesaplama hatası: ' + error.message;
  }
}