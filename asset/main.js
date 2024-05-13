const locat = document.getElementById("current_location")
const apikey = 'a88cc50bb3c6c55c20aace6bb03bbb18';

var date = new Date().toDateString();
const su = document.getElementById("currentDate").textContent = date;
document.getElementById("currentDate1").textContent = 'Today : ' + date;


const success = (position) => {
    console.log(position)
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
    console.log(sRDateObj)
    const utcString = sRDateObj.toTimeString()
    console.log(utcString)
    const timeGMT = utcString.slice(0, -31);
    console.log(timeGMT)

    const SsDateObj = new Date(unixTimestampSunset * 1000);
    console.log(SsDateObj)
    const utcString1 = SsDateObj.toTimeString()
    console.log(utcString)
    const timeGMTSunset = utcString1.slice(0, -31);
    console.log(timeGMTSunset)
    

    currentTemp.textContent = temperature + "°C";
    currentTempName.textContent = description;
    currentTempIcon.src = iconUrl;
    humidities.textContent = currentHumidity + '%';
    windy.textContent = Math.round(curentWind * 3.6) + "km/h";
    time.textContent = timeGMT;
    sunsetTime.textContent =timeGMTSunset;

}
const selected_city =document.getElementById("citySelector");
selected_city.addEventListener("change", citySelection);

function citySelection(event){
   const d = event.target.value;
    console.log(d)
}


