async function fetchWeatherData(lat, long) {
  const apiurl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,precipitation,weathercode,windspeed_10m&daily=sunrise,sunset,precipitation_probability_max&current_weather=true&timezone=auto&forecast_days=2`;
  
  if(apiurl){
    try {
      const data = await sendRequest('GET', apiurl);

      // Обработка данных
      const parts = data.timezone.split("/");
      let locationName = parts[1];

      let url = `https://api.weatherapi.com/v1/timezone.json?key=769397135c3c4799afd232913232108&q=${locationName}`;
      let response = await fetch(url);
      let weatherData = await response.json();
      // Обработка полученных данных, например, установка значений в элементы DOM
      document.getElementById('country').textContent = weatherData.location.country;
      document.getElementById('city').textContent = weatherData.location.name;
      document.getElementById('country-two').textContent = weatherData.location.country;
      document.getElementById('city-two').textContent = weatherData.location.name;

          // api
      let apiurlTwo = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=8`;
      const dataTwo = await sendRequest('GET', apiurlTwo);
      console.log(dataTwo)
          console.log(data);
          // weather code
          // today
          let sunriseStr = data.daily.sunrise[0];
          let sunsetStr = data.daily.sunset[0];
          let currentTime = data.current_weather.time;
          let weatherText = document.getElementById('weather-in-realtime');
          let mainimgToday = document.getElementById('main-img-today');
          if(data.current_weather.weathercode === 0){// если солнечно
            if (currentTime >= sunriseStr && currentTime < sunsetStr) {
              weatherText.textContent = 'Sun';
              mainimgToday.src = 'media/sun.svg';

            } else {
              weatherText.textContent = 'Night';
              mainimgToday.src = 'media/moon.svg';
           }
          } else if (data.current_weather.weathercode >= 1 && data.current_weather.weathercode <= 3){// если немного пасмурно
            if (currentTime >= sunriseStr && currentTime < sunsetStr) {
              weatherText.textContent = 'Cloudy Sun';
              mainimgToday.src = 'media/cloudy-sun.svg';

            } else { 
              weatherText.textContent = 'Cloudy Night';
              mainimgToday.src = 'media/cloudy-moon.svg';     
            }
          } else if (data.current_weather.weathercode >= 31 && data.current_weather.weathercode <= 50){// если пасмурно и туман
            weatherText.textContent = 'Cloudy';
            mainimgToday.src = 'media/cloudy.svg';
          } else if (data.current_weather.weathercode >= 51 && data.current_weather.weathercode <= 57){// если морось, небольшой дождик
            weatherText.textContent = 'Light Rain';
            if (currentTime >= sunriseStr && currentTime < sunsetStr) {
              mainimgToday.src = 'media/rain-sun.svg';

            } else {// заменить 
              mainimgToday.src = 'media/rain-moon.svg';  // заменить
            }
          } else if (data.current_weather.weathercode >= 58 && data.current_weather.weathercode <= 67){// если дождь
            weatherText.textContent = 'Rainy';
            mainimgToday.src = 'media/rain.svg';
          } else if (data.current_weather.weathercode >= 68 && data.current_weather.weathercode <= 77){// если легкий снег
            if (currentTime >= sunriseStr && currentTime < sunsetStr) {// заменить
              weatherText.textContent = 'Light Snow';
              mainimgToday.src = 'media/light-snow-sun.svg';
            } else {// заменить 
              weatherText.textContent = 'light Snow';
              mainimgToday.src = 'media/light-snow-moon.svg';  // заменить 
            }
          } else if (data.current_weather.weathercode >= 78 && data.current_weather.weathercode <= 86){// если снег
            weatherText.textContent = 'Snow';
            mainimgToday.src = 'media/snow.svg';
          } else if (data.current_weather.weathercode >= 87 && data.current_weather.weathercode <= 99){ // если гроза
            weatherText.textContent = 'Storm';
            mainimgToday.src = 'media/storm.svg';
          } else {
            weatherText.textContent = 'Storm';
            mainimgToday.src = 'media/storm.svg';
          } 
          // tomorrow
          let weatherTextTomorrow = document.getElementById('weather-in-tommorow');
          let mainimgTomorrow = document.getElementById('main-img-tomorrow');
          let mainimgTomorrowTwo = document.getElementById('main-img-tomorrow-two');
          let weathercodeTomorrow = dataTwo.daily.weathercode[1];
          if(weathercodeTomorrow === 0){// если солнечно
            weatherTextTomorrow.textContent = 'Sun';
            mainimgTomorrow.src = 'media/sun.svg';
            mainimgTomorrowTwo.src = 'media/sun.svg';
          } else if (weathercodeTomorrow >= 1 && weathercodeTomorrow <= 30){// если немного пасмурно
            weatherTextTomorrow.textContent = 'Cloudy Sun';
            mainimgTomorrow.src = 'media/cloudy-sun.svg';
            mainimgTomorrowTwo.src = 'media/cloudy-sun.svg';
          } else if (weathercodeTomorrow >= 31 && weathercodeTomorrow <= 50){// если пасмурно и туман
            weatherTextTomorrow.textContent = 'Cloudy';
            mainimgTomorrow.src = 'media/cloudy.svg';
            mainimgTomorrowTwo.src = 'media/cloudy.svg';
          } else if (weathercodeTomorrow >= 51 && weathercodeTomorrow <= 57){// если морось, небольшой дождик
            weatherTextTomorrow.textContent = 'Light Rain';
            mainimgTomorrow.src = 'media/rain-sun.svg';
            mainimgTomorrowTwo.src = 'media/rain-sun.svg';
          } else if (weathercodeTomorrow >= 58 && weathercodeTomorrow <= 67){// если дождь
            weatherTextTomorrow.textContent = 'Rainy';
            mainimgTomorrow.src = 'media/rain.svg';
            mainimgTomorrowTwo.src = 'media/rain.svg';
          } else if (weathercodeTomorrow >= 68 && weathercodeTomorrow <= 77){// если легкий снег
            weatherTextTomorrow.textContent = 'Light Snow';
            mainimgTomorrow.src = 'media/light-snow-sun.svg';
            mainimgTomorrowTwo.src = 'media/light-snow-sun.svg';
          } else if (weathercodeTomorrow >= 78 && weathercodeTomorrow <= 86){// если снег
            weatherTextTomorrow.textContent = 'Snow';
            mainimgTomorrow.src = 'media/snow.svg';
            mainimgTomorrowTwo.src = 'media/snow.svg';
          } else if (weathercodeTomorrow >= 87 && weathercodeTomorrow <= 99){ // если гроза
            weatherTextTomorrow.textContent = 'Storm';
            mainimgTomorrow.src = 'media/storm.svg';
            mainimgTomorrowTwo.src = 'media/storm.svg';
          } else {
            weatherTextTomorrow.textContent = 'Storm';
            mainimgTomorrow.src = 'media/storm.svg';
            mainimgTomorrowTwo.src = 'media/storm.svg';
          } 
          // other
          document.getElementById('degree-in-realtime').textContent = Math.round(data.current_weather.temperature);
          let degreeTomorrowAll = data.hourly.temperature_2m;
          let degreeTomorrowOne = 0;
          for(let o = 24; o < degreeTomorrowAll.length; o++){
            degreeTomorrowOne = degreeTomorrowOne + degreeTomorrowAll[o];
          }
          document.querySelector('.degree-in-tommorow').textContent = Math.round(degreeTomorrowOne / 24);
          document.querySelector('.degree-in-tommorow-two').textContent = Math.round(degreeTomorrowOne / 24) + ' °';
          // влажность в среднем на сегодня
          let soil = data.hourly.relativehumidity_2m;
          let soilOne = 0;
          for(let i = 0; i <= 24; i++){
            soilOne = soilOne + soil[i]
          }

          let humid = document.getElementById('humidity');
          humid.textContent = Math.round(soilOne / 24) + '%';


          // функция для определение вероятности дождя в среднем на сегодня
          let rainFall  = document.getElementById('rain-fall');
          let dailyOne = data.hourly.precipitation_probability;
          let daily = 0;
          for(let b = 0; b <= 24; b++){
            daily = daily + dailyOne[b];
          }
          rainFall.textContent = Math.round(daily / 24) + '%';
          // скорость ветра в реальном времени
          document.getElementById('wind-speed').textContent = Math.round(data.current_weather.windspeed) + 'km/h';
          // на завтра
          
          // влажность в среднем на завтра
          let soilTwo = 0;
          for(let i = 24; i <  soil.length; i++){
            soilTwo = soilTwo + soil[i]
          }
          let humidTomorrow = document.getElementById('humidity-tomorrow');
          humidTomorrow.textContent = Math.round(soilTwo / 24) + '%';
          let humidTomorrowTwo = document.getElementById('humidity-tomorrow-two');
          humidTomorrowTwo.textContent = Math.round(soilTwo / 24) + '%';

          // функция для определение вероятности дождя в среднем на завтра
          let rainFallTomorrow = document.getElementById('rainFall-tommorow');
          let rainFallTomorrowTwo = document.getElementById('rainFall-tommorow-two');
          let dailyTomorrow = 0;
          for(let b = 24; b < dailyOne.length; b++){
            dailyTomorrow = dailyTomorrow + dailyOne[b];
          }
          rainFallTomorrow.textContent = Math.round(dailyTomorrow / 24) + '%';
          rainFallTomorrowTwo.textContent = Math.round(dailyTomorrow / 24) + '%';
          // функция для определения средней скорости ветра на завтра
          let windOne = data.hourly.windspeed_10m;
          let windspeedTomorrow = document.getElementById('Wind-tommorow');
          let windspeedTomorrowTwo = document.getElementById('Wind-tommorow-two');
          let windTomorrow = 0;
          for(let r = 24; r < windOne.length; r++){
            windTomorrow = windTomorrow + windOne[r]
          }
          windspeedTomorrow.textContent = Math.round(windTomorrow / 24) + 'km/h';
          windspeedTomorrowTwo.textContent = Math.round(windTomorrow / 24) + 'km/h';
          // на каждый час
          for(let c = 0;c <= 24;c++){
            let everyTimeDegreeToday = document.getElementsByClassName('bx-degree')[c];
            let everyDegreeToday = data.hourly.temperature_2m[c];
            everyTimeDegreeToday.textContent = Math.round(everyDegreeToday) + '°';
            
            let sunriseStr = data.daily.sunrise[0];
            let sunsetStr = data.daily.sunset[0];
            let currentTime = data.hourly.time[c];
            let mainimgTodayAll = document.querySelectorAll('.bx-img img');
            let mainimgToday = mainimgTodayAll[c];
            if(data.hourly.weathercode[c] === 0){// если солнечно
              if (currentTime >= sunriseStr && currentTime < sunsetStr) {
                mainimgToday.src = 'media/sun.svg';
              } else {
                mainimgToday.src = 'media/moon.svg';
             }
            } else if (data.hourly.weathercode[c] >= 1 && data.hourly.weathercode[c] <= 30){// если немного пасмурно
              if (currentTime >= sunriseStr && currentTime < sunsetStr) {
                mainimgToday.src = 'media/cloudy-sun.svg';
              } else { 
                mainimgToday.src = 'media/cloudy-moon.svg';     
              }
            } else if (data.hourly.weathercode[c] >= 30 && data.hourly.weathercode[c] <= 50){// если пасмурно и туман
              mainimgToday.src = 'media/cloudy.svg';
            } else if (data.hourly.weathercode[c] >= 51 && data.hourly.weathercode[c] <= 57){// если морось, небольшой дождик
              if (currentTime >= sunriseStr && currentTime < sunsetStr) {
                mainimgToday.src = 'media/rain-sun.svg';
  
              } else {// заменить 
                mainimgToday.src = 'media/rain-moon.svg';  // заменить
              }
            } else if (data.hourly.weathercode[c] >= 58 && data.hourly.weathercode[c] <= 67){// если дождь
              
              mainimgToday.src = 'media/rain.svg';
            } else if (data.hourly.weathercode[c] >= 68 && data.hourly.weathercode[c] <= 77){// если легкий снег
              if (currentTime >= sunriseStr && currentTime < sunsetStr) {// заменить
                mainimgToday.src = 'media/light-snow-sun.svg';
              } else {// заменить 
                mainimgToday.src = 'media/light-snow-moon.svg';  // заменить 
              }
            } else if (data.hourly.weathercode[c] >= 78 && data.hourly.weathercode[c] <= 86){// если снег
              mainimgToday.src = 'media/snow.svg';
            } else if (data.hourly.weathercode[c] >= 87 && data.hourly.weathercode[c] <= 99){ // если гроза
              mainimgToday.src = 'media/storm.svg';
            } else {
              mainimgToday.src = 'media/storm.svg';
            } 
          }
          for(let c = 24;c < 48;c++){
            let everyTimeDegreeToday = document.getElementsByClassName('bx-degree')[c];
            let everyDegreeToday = data.hourly.temperature_2m[c];
            everyTimeDegreeToday.textContent = Math.round(everyDegreeToday) + '°';
            let sunriseStr = data.daily.sunrise[1];
            let sunsetStr = data.daily.sunset[1];
            let currentTime = data.hourly.time[c];
            let mainimgTodayAll = document.querySelectorAll('.bx-img img');
            let mainimgToday = mainimgTodayAll[c];
            if(data.hourly.weathercode[c] === 0){// если солнечно
              if (currentTime >= sunriseStr && currentTime < sunsetStr) {
                mainimgToday.src = 'media/sun.svg';
              } else {
                mainimgToday.src = 'media/moon.svg';
             }
            } else if (data.hourly.weathercode[c] >= 1 && data.hourly.weathercode[c] <= 30){// если немного пасмурно
              if (currentTime >= sunriseStr && currentTime < sunsetStr) {
                mainimgToday.src = 'media/cloudy-sun.svg';
              } else { 
                mainimgToday.src = 'media/cloudy-moon.svg';     
              }
            } else if (data.hourly.weathercode[c] >= 31 && data.hourly.weathercode[c] <= 50){// если пасмурно и туман
              mainimgToday.src = 'media/cloudy.svg';
            } else if (data.hourly.weathercode[c] >= 51 && data.hourly.weathercode[c] <= 57){// если морось, небольшой дождик
              if (currentTime >= sunriseStr && currentTime < sunsetStr) {
                mainimgToday.src = 'media/rain-sun.svg';
  
              } else {// заменить 
                mainimgToday.src = 'media/rain-moon.svg';  // заменить
              }
            } else if (data.hourly.weathercode[c] >= 58 && data.hourly.weathercode[c] <= 67){// если дождь
              
              mainimgToday.src = 'media/rain.svg';
            } else if (data.hourly.weathercode[c] >= 68 && data.hourly.weathercode[c] <= 77){// если легкий снег
              if (currentTime >= sunriseStr && currentTime < sunsetStr) {// заменить
                mainimgToday.src = 'media/light-snow-sun.svg';
              } else {// заменить 
                mainimgToday.src = 'media/light-snow-moon.svg';  // заменить 
              }
            } else if (data.hourly.weathercode[c] >= 78 && data.hourly.weathercode[c] <= 86){// если снег
              mainimgToday.src = 'media/snow.svg';
            } else if (data.hourly.weathercode[c] >= 87 && data.hourly.weathercode[c] <= 99){ // если гроза
              mainimgToday.src = 'media/storm.svg';
            } else {
              mainimgToday.src = 'media/storm.svg';
            } 
          }
      // для 6дней 
          // start
      let sixdays = document.querySelectorAll('.any-day');
      for (let f = 0; f < sixdays.length; f++) {
          let anyDay = sixdays[f];
          let anyImg = anyDay.querySelector('.day-img');
          let weathercodeSixdays = dataTwo.daily.weathercode[f + 2];
          let anyDayDegree = anyDay.querySelector('.day-degree');
          anyDayDegree.innerHTML = `
            <span style="font-size: 12px;color: #9C9EAA;">${Math.round(dataTwo.daily.temperature_2m_min[f + 2])}/</span> ${Math.round(dataTwo.daily.temperature_2m_max[f + 2]) + ' °'}
          `
          if(weathercodeSixdays === 0){// если солнечно
            anyImg.src = 'media/sun.svg';
          } else if (weathercodeSixdays >= 1 && weathercodeSixdays <= 30){// если немного пасмурно
            anyImg.src = 'media/cloudy-sun.svg';
          } else if (weathercodeSixdays >= 31 && weathercodeSixdays <= 50){// если пасмурно и туман
            anyImg.src = 'media/cloudy.svg';
          } else if (weathercodeSixdays >= 51 && weathercodeSixdays <= 57){// если морось, небольшой дождик
            anyImg.src = 'media/rain-sun.svg';
          } else if (weathercodeSixdays >= 58 && weathercodeSixdays <= 67){// если дождь
            anyImg.src = 'media/rain.svg';
          } else if (weathercodeSixdays >= 68 && weathercodeSixdays <= 77){// если легкий снег
            anyImg.src = 'media/light-snow-sun.svg';
          } else if (weathercodeSixdays >= 78 && weathercodeSixdays <= 86){// если снег
            anyImg.src = 'media/snow.svg';
          } else if (weathercodeSixdays >= 87 && weathercodeSixdays <= 99){ // если гроза
            anyImg.src = 'media/storm.svg';
          } else {
            anyImg.src = 'media/storm.svg';
          } 
      }

        
    } catch (error) {
      alert('Invalid location entered or weather data retrieval failed.'); 
    } finally{
      let loader = document.querySelector('body');
      loader.classList.remove('load');
      loader.classList.add('notload');
    }
  }
}
function sendRequest(method, url, body = null) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = 'json';

    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject('ERROR');
      } else {
        resolve(xhr.response);
      }
    }
    xhr.send();
  });
}



let currentDate = new Date();

// Массив с названиями дней недели на английском
let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

for (let i = 1; i < 7; i++) {
    let futureDate = new Date(currentDate.getTime() + i * 24 * 60 * 60 * 1000);
    let dayIndex = futureDate.getDay();
    let dayName = daysOfWeek[dayIndex];
    let allDay = document.querySelectorAll('.any-day .day');
    allDay[i-1].textContent = dayName;

}



function getLocation() {
  if ("geolocation" in navigator) {
    // Запрашиваем текущее местоположение пользователя
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      
      fetchWeatherData(latitude,longitude);
      
      
    }, function (error) {
      // Обработка ошибки получения местоположения
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.error("Пользователь отклонил запрос на геолокацию");
          break;
        case error.POSITION_UNAVAILABLE:
          console.error("Информация о местоположении недоступна");
          break;
        case error.TIMEOUT:
          console.error("Превышено время ожидания запроса на геолокацию");
          break;
        case error.UNKNOWN_ERROR:
          console.error("Неизвестная ошибка при получении местоположения");
          break;
      }
    });
  } else {
    console.log("Геолокация не поддерживается вашим браузером");
  }
}

// Вызываем функцию для определения местоположения
getLocation();







async function searchCity() {
  let searchconsole = document.querySelector('.search-console');
  searchconsole.classList.remove('active');
  let cityInput = document.getElementById('cityInput').value;
  const englishLettersOnly = /^[a-zA-Z\s]*$/;
  try {
    if (cityInput.trim() === "") {
      alert('Please enter a city!');
      return;
    }
    // Проверка на наличие только английских символов
    if (!englishLettersOnly.test(cityInput)) {
      alert('Please enter the city name in English only.');
      return;
    }
    let url = `https://api.weatherapi.com/v1/current.json?key=769397135c3c4799afd232913232108&q=${cityInput}`;
    let response = await fetch(url);
    if (!response.ok) {
      alert('City not found. Please enter a valid city name.');
      return;
    }
    let weatherData = await response.json();
    console.log(weatherData)
    fetchWeatherData(weatherData.location.lat, weatherData.location.lon)
  } catch (error) {
    console.error('An error occurred:', error);
  }
}







function handleEnterKey(event) {
  let searchInput = document.querySelector("#cityInput");
  if (searchInput === document.activeElement) {
    if (event.key === 'Enter') {
      let searchButton = document.querySelector('#searchButton')
      searchButton.click();
      let searchconsole = document.querySelector('.search-console');
      searchconsole.classList.remove('active');
      searchInput.blur();
    }
  }
}

cityInput.addEventListener('keydown', handleEnterKey);
function searchopen(){
  let searchconsole = document.querySelector('.search-console');
  searchconsole.classList.add('active');
  const searchInput = searchconsole.querySelector("#cityInput");
  searchInput.focus();
}

function searchclose(event){
  let searchconsole = document.querySelector('.search-console');
  let search = document.querySelector('.search')
  if (!searchconsole.contains(event.target) && !search.contains(event.target)) {
    searchconsole.classList.remove('active');
  }
  const searchInput = document.querySelector("#cityInput");
  searchInput.value = '';

}

window.addEventListener('click', searchclose);

















  





let startX;
const touchThreshold = 50;


function handleTouchStart(event) {
    startX = event.touches[0].clientX;
}

function handleTouchMove(event) {
    const currentX = event.touches[0].clientX;
    const deltaX = currentX - startX;

    const weatherElement = document.querySelector('.weather');

    if (deltaX > touchThreshold) {
      weatherElement.classList.remove('right');
      weatherElement.classList.add('left');
    } else if (deltaX < -touchThreshold) {
      weatherElement.classList.remove('left');
      weatherElement.classList.add('right');
    }
}

function handleLeftClick() {
    const headerElement = document.querySelector('.weather');
    headerElement.classList.remove('right');
    headerElement.classList.add('left');
}

function handleRightClick() {
    const headerElement = document.querySelector('.weather');
    headerElement.classList.remove('left');
    headerElement.classList.add('right');
}

// дата на сегодня
function showCurrentDate() {
  let headingElement = document.getElementById('data');
  let currentDate = new Date();
  let options = { weekday: 'short', month: 'short', day: 'numeric' };
  let formattedDate = currentDate.toLocaleDateString('en-US', options);
  headingElement.textContent = formattedDate;
}

showCurrentDate();
// дата на затвра
function showTomorrowDate() {
  let tomorrowElement = document.getElementById('data-tomorrow');
  let tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  let options = { weekday: 'short', month: 'short', day: 'numeric' };
  let formattedDate = tomorrowDate.toLocaleDateString('en-US', options);
  tomorrowElement.textContent = formattedDate;
}

showTomorrowDate();


// функция для кнопки следующие дни

function nextdaysTwo(){
  let next = document.querySelector('#next-days');
  next.classList.remove('notactive');
  next.classList.add('active');
  let nextTwo = document.querySelector('#nextTwo-days');
  nextTwo.classList.add('notactive');
  nextTwo.classList.remove('active');
  let nextThree = document.querySelector('#nextThree-days');
  nextThree.classList.add('notactive');
  nextThree.classList.remove('active');

}

