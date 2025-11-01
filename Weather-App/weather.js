const apiKey = "3895e260eff3f6c3ae8b5026b44281b8";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=bangkok";  

async function checkWeather(){
    const response = await fetch(`${apiUrl}&appid=${apiKey}`);
    const data = await response.json();

    console.log(data);
}
checkWeather();