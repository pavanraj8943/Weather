
function updateDateTime() {
  const now = new Date();
  const optionsDate = { day: "2-digit", month: "short", year: "numeric" };
  const optionsTime = { hour: "2-digit", minute: "2-digit", second: "2-digit" };

  document.getElementById("date").innerText = now.toLocaleDateString("en-GB", optionsDate);
  document.getElementById("time").innerText = now.toLocaleTimeString("en-GB", optionsTime);
}
setInterval(updateDateTime, 1000);
updateDateTime();





document.getElementById("search").addEventListener("click", async () => {
    const city = document.getElementById("city").value.trim();
    const display = document.getElementById("display");
  
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=afe66245bd764aaaac3a5196ef5c2d17`
      );
  
      if (res.status !== 200)
        return alert(`${city} is not found`);
  
      const data = await res.json();
      const clouds = data.clouds.all;
  

      const cloudyBg =
        "url('https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?cs=srgb&dl=pexels-pixabay-209831.jpg&fm=jpg')";
      const clearBg =
        "url('https://t3.ftcdn.net/jpg/14/63/72/50/360_F_1463725010_Omm579saIDvqCYqXN3rBRbTQ0SBR0sby.jpg')";
  
   
      document.body.style.backgroundImage = clouds >= 75 ? cloudyBg : clearBg;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
      document.body.style.transition = "background-image 3s ease-in-out";
  

      const textColor = "#ffffff";
  
      const str = `
        <div class="space-y-6">
          <h1 class="text-4xl font-bold" style="color:${textColor};">
            ${data.name}, ${data.sys.country}
          </h1>
  
          <div class="flex flex-col md:flex-row justify-center items-center gap-4">
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
                 alt="${data.weather[0].main}"  
                 class="w-24 h-24 drop-shadow-lg" />
            <div class="text-center md:text-left">
              <h2 class="text-2xl font-semibold" style="color:${textColor};">${data.weather[0].main}</h2>
              <p class="capitalize" style="color:${textColor}cc;">${data.weather[0].description}</p>
            </div>
          </div>
  
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm md:text-base" style="color:${textColor};">
            <div class="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-md">
              <p class="font-semibold" style="color:${textColor};">🌡️ Temperature</p>
              <p>${(data.main.temp - 273.15).toFixed(1)}°C</p>
            </div>
  
            <div class="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-md">
              <p class="font-semibold" style="color:${textColor};">🤔 Feels Like</p>
              <p>${(data.main.feels_like - 273.15).toFixed(1)}°C</p>
            </div>
  
            <div class="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-md">
              <p class="font-semibold" style="color:${textColor};">💨 Wind</p>
              <p>${data.wind.speed} m/s (${data.wind.deg}°)</p>
            </div>
  
            <div class="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-md">
              <p class="font-semibold" style="color:${textColor};">☁️ Clouds</p>
              <p>${data.clouds.all}%</p>
            </div>
  
            <div class="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-md">
              <p class="font-semibold" style="color:${textColor};">💧 Humidity</p>
              <p>${data.main.humidity}%</p>
            </div>
  
            <div class="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-md">
              <p class="font-semibold" style="color:${textColor};">📈 Pressure</p>
              <p>${data.main.pressure} hPa</p>
            </div>
  
            <div class="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-md">
              <p class="font-semibold" style="color:${textColor};">🌅 Sunrise</p>
              <p>${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
            </div>
  
            <div class="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-md">
              <p class="font-semibold" style="color:${textColor};">🌇 Sunset</p>
              <p>${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
            </div>
  
            <div class="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-md">
              <p class="font-semibold" style="color:${textColor};">📍 Coordinates</p>
              <p>Lon: ${data.coord.lon}, Lat: ${data.coord.lat}</p>
            </div>
          </div>
  
          <p class="text-sm mt-4" style="color:${textColor}99;">
            Visibility: ${(data.visibility / 1000).toFixed(1)} km |
            Timezone: UTC ${data.timezone / 3600 >= 0 ? "+" : ""}${data.timezone / 3600}
          </p>
        </div>
      `;
  
      display.innerHTML = str;
  
    } catch (error) {
      console.error(error);
    }
  });
  