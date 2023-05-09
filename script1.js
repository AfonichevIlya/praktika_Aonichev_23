const countrySelect = document.getElementById('country-select');
const genreButtons = document.querySelectorAll('.genre-button');

async function krData(strana_str) {
  const response = await fetch(`http://de1.api.radio-browser.info/json/stations/bycountry/${strana_str}`);
  const stations = await response.json();
  return stations;
}

const getValue = function (array, knopka) {
  // Выбираем только те станции, у которых есть тег с жанром, совпадающим с кнопкой
  const filteredStations = array.filter(station => station.tags.includes(knopka.dataset.genre));
  
  if (filteredStations.length > 0) {
    // Открываем первую радиостанцию из выбранных
    window.open(filteredStations[0].url);
  } else {
    alert(`Не найдено станций с жанром ${knopka.dataset.genre}`);
  }
}

genreButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Получаем выбранную страну из выпадающего списка
    const strana_str = countrySelect.value;

    // Получаем информацию о радиостанциях в выбранной стране
    krData(strana_str)
      .then(stations => getValue(stations, button))
      .catch(error => console.error(error));
  });
});