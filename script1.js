// Получаем элементы со страницы
const countryInput = document.querySelector('#country-input');
const buttons = document.querySelectorAll('.genre-button');

// Функция для получения данных с API RadioBrowser
async function krData(strana) {
  try {
    const response = await fetch(`https://de1.api.radio-browser.info/json/stations/bycountry/${strana}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

// Функция для открытия ссылки на радиостанцию в новой вкладке
function openStationLink(link) {
  window.open(link, '_blank');
}

// Обработчик события для кнопок жанров
buttons.forEach(button => {
  button.addEventListener('click', async () => {
    const country = countryInput.value.trim();
    const genre = button.dataset.genre;
    const stations = await krData(country);
    for (let i = 0; i < stations.length; i++) {
      const station = stations[i];
      if (station.tags.includes(genre)) {
        openStationLink(station.homepage);
        break;
      }
      if (i === stations.length - 1) {
        console.log(`No station found for genre "${genre}"`);
      }
    }
  });
});