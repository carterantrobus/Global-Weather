// To perform search when user hits enter key
document.querySelector(".searchbar").addEventListener("keypress", function (event){
    if(event.key == "Enter"){
        getCityData(document.querySelector(".searchbar").value);
    }
});




// To get user location (for default weather data)
function getUserLocation(){

    let status = document.querySelector('.city');

    let success = (position) => {
        console.log(position)
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        let geoData = 'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=' + latitude + '&longitude='+ longitude +'&localityLanguage=en'
        fetch(geoData)
            .then((response) => response.json())
            .then((data)=>{getCityData(data.city)})

    }

    let error = () => {

        status.textContent = 'Could Not Retrieve Location';
    }

    navigator.geolocation.getCurrentPosition(success, error);

}





// fetches weather data from openweathermap api given a city name
function getCityData(city)
{
    let apikey = "cee091ccd5e1214c4c45aa93339e9a54";

    // Fetches current weather
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=" + apikey
    )
        .then((response)=> response.json())
        .then ((data) => showCityDataCurrent(data));


    // Fetches forecasted weather for the next 5 days
    fetch("https://api.openweathermap.org/data/2.5/forecast?q="+ city + "&appid=" + apikey
    )
        .then((response)=> response.json())
        .then ((data) => showCityDataForecast(data));

}





const unitSelect = document.getElementById('unitSelect');
function getSelectedUnit() {
    const unitValue = unitSelect.elements.unit.value;
    return unitValue;
}


function getBackgroundClass(description) {
    if (/clear/i.test(description)) {
        return '';
    } else if (/cloud/i.test(description)) {
        return 'cloudy';
    } else if (/rain/i.test(description)) {
        return 'rainy';
    } else {
        return '';
    }
}


// Shows City data from fetched weather data
function showCityDataCurrent(data) {
    //console.log(data);

    let {name} = data
    let {temp,feels_like,humidity} = data.main;
    let {speed} = data.wind;
    let {icon, description} = data.weather[0];
    let space = description.indexOf(' ');
    let Description;
    if (space !== -1) {
        Description = description.charAt(0).toUpperCase() + description.slice(1, space+1) + description.charAt(space+1).toUpperCase() + description.slice(space+2);
    } else {
        Description = description.charAt(0).toUpperCase() + description.slice(1);
    }
    //console.log(name,temp, feels_like,humidity, speed,icon,description);
    document.querySelector(".city").innerText = "Current Weather in " + name;
    document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".description").innerText = Description;

    temp = parseFloat(temp);
    feels_like = parseFloat(feels_like);

    // In your showCityDataCurrent function, after setting the description element text:
    const backgroundClass = getBackgroundClass(description);
    document.body.className = backgroundClass;


    var unit = "°C";
    if (getSelectedUnit() ===  "Fahrenheit"){
        //formula to convert kelvin to Fahrenheit (because default is kelvin)
        temp = Math.round((temp - 273.15)*1.8 +32);
        feels_like = Math.round((feels_like - 273.15)*1.8 +32);
        unit = "°F";
    } else if (getSelectedUnit() ===  "Celsius"){
        //formula to convert kelvin to celsius (because default is kelvin)
        temp = Math.round(temp - 273.15)
        feels_like = Math.round(feels_like - 273.15);
        unit = "°C";
    }


    temp = temp.toString();
    feels_like = feels_like.toString();

    document.querySelector(".temp").innerText = temp + unit + " but feels like " + feels_like + unit;
    document.querySelector(".humidity").innerText = "Humidity is " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind Speed is " + speed + "km/h";
}




// Converts temperatures to selected unit and returns temp with correct unit
function conversion(temp){
    //temp = parseFloat(temp)

    var unit = "°C";
    if (getSelectedUnit() ===  "Fahrenheit"){
        //formula to convert kelvin to Fahrenheit (because default is kelvin)
        temp = Math.round((temp - 273.15)*1.8 +32);
        unit = "°F";
        return [temp,unit];
    } else if (getSelectedUnit() ===  "Celsius"){
        //formula to convert kelvin to celsius (because default is kelvin)
        temp = Math.round(temp - 273.15)
        unit = "°C";
        return [temp,unit];
    }
}





// Shows forecasts temperatures for the next 5 days (at specified city)
function showCityDataForecast(data){

    //0,8,16,24,32
    // console.log(data.list);

    // Retrieving weather data for the next 5 days from the json data that was passed in
    let day1 = data.list[0];
    let day2 = data.list[8];
    let day3 = data.list[16];
    let day4 = data.list[24];
    let day5 = data.list[32];

    // Retrieving only the temperature data for the next 5 days
    let temp1 = day1.main.temp;
    let temp2 = day2.main.temp;
    let temp3 = day3.main.temp;
    let temp4 = day4.main.temp;
    let temp5 = day5.main.temp;

    // // Retrieving time and day for the next 5 days
    // let time1 = day1.dt_txt;
    // let time2 = day2.dt_txt;
    // let time3 = day3.dt_txt;
    // let time4 = day4.dt_txt;
    // let time5 = day5.dt_txt;


    // Units for each day (F or C)
    let unit1;
    let unit2;
    let unit3;
    let unit4;
    let unit5;

    // Converting to user selecting metric (F or C)
    [temp1,unit1] = conversion(temp1);
    [temp2,unit2] = conversion(temp2);
    [temp3,unit3] = conversion(temp3);
    [temp4,unit4] = conversion(temp4);
    [temp5,unit5] = conversion(temp5);



    // Retrieving descriptive images for the next 5 days
    let icon1 = day1.weather[0].icon;
    let icon2 = day2.weather[0].icon;
    let icon3 = day3.weather[0].icon;
    let icon4 = day4.weather[0].icon;
    let icon5 = day5.weather[0].icon;


    // // Adding temperature forecasts to html
    // document.querySelector(".time1").innerText = time1;
    // document.querySelector(".time2").innerText = time2;
    // document.querySelector(".time3").innerText = time3;
    // document.querySelector(".time4").innerText = time4;
    // document.querySelector(".time5").innerText = time5;


    // Adding temperature forecasts to html
    document.querySelector(".temp1").innerText = temp1 + unit1;
    document.querySelector(".temp2").innerText = temp2 + unit2;
    document.querySelector(".temp3").innerText = temp3 + unit3;
    document.querySelector(".temp4").innerText = temp4 + unit4;
    document.querySelector(".temp5").innerText = temp5 + unit5;

    // Adding descriptive temperature image to html
    document.querySelector(".icon1").src = "http://openweathermap.org/img/wn/" + icon1 + "@2x.png";
    document.querySelector(".icon2").src = "http://openweathermap.org/img/wn/" + icon2 + "@2x.png";
    document.querySelector(".icon3").src = "http://openweathermap.org/img/wn/" + icon3 + "@2x.png";
    document.querySelector(".icon4").src = "http://openweathermap.org/img/wn/" + icon4 + "@2x.png";
    document.querySelector(".icon5").src = "http://openweathermap.org/img/wn/" + icon5 + "@2x.png";

}




// For saving favourite locations on sidebar
function saveLocation(){
    // Take the search input as a city name variable
    let cityName = document.querySelector(".searchbar").value;

    let saveCity;
    let space = cityName.indexOf(' ');

    if (space !== -1) {
        saveCity = cityName.charAt(0).toUpperCase() + cityName.slice(1, space+1) + cityName.charAt(space+1).toUpperCase() + cityName.slice(space+2);
    } else {
        saveCity = cityName.charAt(0).toUpperCase() + cityName.slice(1);
    }

    // Retrieve the sidebar to add favourite locations
    let favLocations = document.getElementById("sidebar");

    // Create "button" and "div" tags for storing the city
    let button = document.createElement('button');
    let hr = document.createElement('hr');

    button.innerHTML = "<strong>" + saveCity + "</strong>";

    // When city is clicked, retrieve that city weather data
    button.onclick = function(){
        getCityData(cityName);
    }
    // Append "a" tag to div, then append div to sidebar
    let d = document.createElement('div');
    if (cityName !== "") {
        d.appendChild(button)
        d.appendChild(hr)
    }

    favLocations.appendChild(d);

    localStorage.setItem(cityName,cityName);
    console.log(localStorage);
}



// Viewing cities stored in the cache for the favourite cities sidebar
function retrieveStoredCities(){

    // Loop through saved locations in cache, then add them to the sidebar
    for (let i = 0; i < localStorage.length; i++){

        //$('sidebar').append(localStorage.getItem(localStorage.key(i)));
        let city = localStorage.key(i);

        let City;
        let space = city.indexOf(' ');

        if (space !== -1) {
            City = city.charAt(0).toUpperCase() + city.slice(1, space+1) + city.charAt(space+1).toUpperCase() + city.slice(space+2);
         } else {
            City = city.charAt(0).toUpperCase() + city.slice(1);
         }

        let favLocations = document.getElementById("sidebar");

        // Create "button" and "div" tags for storing the city
        let button = document.createElement('button');
        let hr = document.createElement('hr');

        button.innerHTML = "<strong>" + City + "</strong>";

        // When city is clicked, retrieve that city weather data
        button.onclick = function(){
            getCityData(City);
        }
        // Append "a" tag to div, then append div to sidebar
        let d = document.createElement('div');
        d.appendChild(button)
        d.appendChild(hr)

        favLocations.appendChild(d);

    }
}






// Sends searchbar value to the getCityData function
function searchCity()
{
    getCityData(document.querySelector(".searchbar").value);
}
