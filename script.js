// List of weather descriptions and their corresponding video files

const weatherVideos={
    "clear sky": "clear_sky_1.mp4",
    "broken clouds": "broken_clouds.mp4",
    "few clouds": "few_clouds.mp4",
    "overcast clouds": "overcast_clouds.mp4",
    "scattered clouds": "scattered_clouds.mp4",
    "mist": "mist.mp4",
    "snow": "snow.mp4",
    "rain": "rain.mp4",
    "shower rain": "rain.mp4",
    "thunderstorm": "thunderstorm.mp4",
    "fog": "mist.mp4",
    "haze": "mist.mp4",
    "heavy rain": "rain.mp4",
    "heavy intensity rain": "rain.mp4",
    "moderate rain": "rain.mp4",
    "light rain": "light_rain.mp4",
    "light snow": "snow.mp4"

};

// Function to set video background based on weather description
function setWeatherBackground(description){
    const body = document.body;
    const lowerDescription = description.toLowerCase();

    let videoFile = weatherVideos[lowerDescription] || "general.mp4"; //find matching video or default to general video
    body.style.backgroundImage =  "none";    //remove any existing background image

    //remove any existing video element
    const existingVideo = document.getElementById("bg-video");
    if (existingVideo){
        existingVideo.remove();
    }

    //create and append new video element
    const video = document.createElement("video");
    video.id = "bg-video";
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true; //for mobile compatibility

    //setting video source
    const source = document.createElement("source");
    source.src = `videos/${videoFile}`;  //videos are in 'videos' folder
    source.type = "video/mp4";

    video.appendChild(source);
    document.body.insertBefore(video, document.body.firstChild);
}


//fetching weather data using openweathermap API
let weather={
    "apiKey": "9b4cbb00b801fa41262805b4eeadb774",
    fetchWeather: function(city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey)
            .then((response) => {
                if(!response.ok){
                    throw new Error("City not found");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data))
            .catch((error) => {
                console.log("Error fetching weather:", error);
                alert(error.message);
            });
    },
    displayWeather: function(data){
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed}= data.wind;
        console.log(name,icon, description,temp,humidity, speed);

        document.querySelector(".city").innerText="Weather in "+ name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+ icon +"@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp+ "°C";
        document.querySelector(".humidity").innerText = "Humidity: "+ humidity +"%";
        document.querySelector(".wind").innerText= "Wind Speed: " + speed +" km/hr.";

        //set video background based on weather description
        setWeatherBackground(description);
    },

    search: function(){
        const cityName = document.querySelector(".search-bar").value;
        if (cityName){
            this.fetchWeather(cityName);
        }else {
            alert("Please enter a city name");
        }
    }
};

//making the search bar work
document.querySelector(".search button")
.addEventListener("click", function(){
    weather.search();
});

//adding an event listener for pressing the enter key
document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        weather.search();
    }
});

weather.fetchWeather("London"); //placeholder city
