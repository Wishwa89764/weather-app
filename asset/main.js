const locat = document.getElementById("current_location")
const apikey = 'a88cc50bb3c6c55c20aace6bb03bbb18';

var date = new Date().toDateString();
const su = document.getElementById("currentDate").textContent = date;
document.getElementById("currentDate1").textContent = 'Today : ' + date;


const success = (position) => {    
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
    fetch(geoApiUrl).then(res => res.json()).then(data => {
        console.log(data)
        let city = data.locality;
        locat.textContent = city;

        const current_weather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
        fetch(current_weather).then(res => res.json()).then(data => {
            console.log(data)
            display(data);
        })

        const daily_forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`;
        fetch(daily_forecast).then(res => res.json()).then(data => {
            console.log(data)
        })


    })
}
const error = () => {
    locat.textContent = "Unable Load";
}
navigator.geolocation.getCurrentPosition(success, error);

function display(data) {
    const currentTemp = document.getElementById('lblTodayTemp');
    const currentTempName = document.getElementById('lblTodayTempName');
    const currentTempIcon = document.getElementById('weatherImageToday');
    const humidities = document.getElementById('humidity')
    const windy = document.getElementById('wind')
    const time = document.getElementById('sunrise')
    const sunsetTime = document.getElementById('sunset')

    const temperature = Math.round(data.main.temp - 273.15);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    const currentHumidity = data.main.humidity;
    const curentWind = data.wind.speed;
    const unixTimestampSunrise = data.sys.sunrise;
    const unixTimestampSunset = data.sys.sunset;

    const sRDateObj = new Date(unixTimestampSunrise * 1000);

    const utcString = sRDateObj.toTimeString()
 
    const timeGMT = utcString.slice(0, -31);


    const SsDateObj = new Date(unixTimestampSunset * 1000);
 
    const utcString1 = SsDateObj.toTimeString()

    const timeGMTSunset = utcString1.slice(0, -31);



    currentTemp.textContent = temperature + "°C";
    currentTempName.textContent = description;
    currentTempIcon.src = iconUrl;
    humidities.textContent = currentHumidity + '%';
    windy.textContent = Math.round(curentWind * 3.6) + "km/h";
    time.textContent = timeGMT;
    sunsetTime.textContent = timeGMTSunset;

}

const search_city = document.getElementById("btn-search");
search_city.addEventListener("click", citySearch);

function citySearch(event) {
    const city = document.getElementById("txt-city").value;
    console.log(city)
    const selectedCityWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    //const citySearchLL = `https://api.openweathermap.org/data/2.5/weather?lat=8.0522985244333&lon=80.42465596169191&appid=${apikey}`
    fetch(selectedCityWeather)
        .then(res => res.json())
        .then(data => {
        
            if(data.cod===200){
                displayCityWeather(data);
            }else{
                alert("Sory... Your City Can't be find");
            }
        })
      
}

function displayCityWeather(data) {
    const currentTemp = document.getElementById('cityTemp');
    const currentTempName = document.getElementById('tempName');
    const currentTempIcon = document.getElementById('weatherImageToday');
    const humidities = document.getElementById('cityHumidity')
    const windy = document.getElementById('cityWind')
    const time = document.getElementById('citySunrise')
    const sunsetTime = document.getElementById('citySunset')
    const location = document.getElementById('selected-location')

    const temperature = Math.round(data.main.temp - 273.15);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    const currentHumidity = data.main.humidity;
    const curentWind = data.wind.speed;
    const unixTimestampSunrise = data.sys.sunrise;
    const unixTimestampSunset = data.sys.sunset;
    

    const sRDateObj = new Date(unixTimestampSunrise * 1000);
  
    const utcString = sRDateObj.toTimeString()
 
    const timeGMT = utcString.slice(0, -31);
 

    const SsDateObj = new Date(unixTimestampSunset * 1000);
    
    const utcString1 = SsDateObj.toTimeString()
   
    const timeGMTSunset = utcString1.slice(0, -31);
   


    currentTemp.textContent = temperature + "°C";
    currentTempName.textContent = description;
    currentTempIcon.src = iconUrl;
    humidities.textContent = currentHumidity + '%';
    windy.textContent = Math.round(curentWind * 3.6) + "km/h";
    time.textContent = timeGMT;
    sunsetTime.textContent = timeGMTSunset;
    location.textContent=data.name;

}

