const apiKey = "365c45682e85bca0b567f6e877633ca2";
const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox=document.querySelector(".search input");
const searchBtn=document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather i");

async function checkWeather(city) {  //enables await keyword, possible error handling 

    const response = await fetch(url +city+ `&appid=${apiKey}`);

    if(response.status==404){
        document.querySelector(".error").style.display="block";
        document.querySelector(".weather").style.display="none";
    }

    else{     
        document.querySelector(".error").style.display="none"; 
        var data = await response.json();
        document.querySelector(".description").innerHTML = data.weather[0].description.toUpperCase();
        document.querySelector(".name").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp)+"°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity+"%";
        document.querySelector(".wind").innerHTML = data.wind.speed+"km/hr";
        //console.log(data.weather[0].main);
        if (data.weather[0].main === "Clouds") {
            weatherIcon.className = "fa-solid fa-cloud fa-2x";
            document.querySelector(".card").style.background="linear-gradient(135deg, #a0bff0, #5b788a)";
        }
        else if (data.weather[0].main === "Clear") {
            weatherIcon.className = "fa-solid fa-sun fa-2x";
            document.querySelector(".card").style.background="linear-gradient(135deg, #feba8a, #ffea00)";
        }
        else if (data.weather[0].main === "Rain") {
            weatherIcon.className = "fa-solid fa-cloud-bolt fa-2x";
            document.querySelector(".card").style.background="linear-gradient(135deg, #5f788a, #808080)";
        }
        else if (data.weather[0].main === "Drizzle") {
            weatherIcon.className = "fa-solid fa-cloud-sun-rain fa-2x";
            document.querySelector(".card").style.background="linear-gradient(135deg, #6a5378, #5b788a)";
        }
        else if (data.weather[0].main === "Mist") {
            weatherIcon.className = "fa-solid fa-cloud-rain fa-2x";
            document.querySelector(".card").style.background="linear-gradient(135deg, #a0bff5, #5b788a)";
        }
        document.querySelector(".weather").style.display="block";
    }
}
    
searchBtn.addEventListener("click",()=>{
    checkWeather(searchBox.value);  //Run on clicking the search button
})

searchBox.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {   // run only when Enter is pressed
        checkWeather(searchBox.value);
    }
});

