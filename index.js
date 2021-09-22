const test = document.getElementById("#test");
const loc = document.querySelector("#location");
const temp = document.querySelector('#temperature');
const icon = document.querySelector('#icon');
const infos = document.querySelector('#infos');
const bg = document.querySelector('#main');
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPosition);
    function getPosition(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        function getWeather() {
            window.fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=fr&units=metric&appid=69012ee404da614e52f21e63c243c1ed`)
                .then(res => res.json())
                .then(resJson => {
                    loc.textContent = `${resJson.name}`;
                    temp.textContent = `${resJson.main.temp} °C`;
                    const img = document.createElement("img");
                    img.src = 'https://openweathermap.org/img/w/'+resJson.weather[0].icon+'.png';
                    icon.appendChild(img);
                    infos.textContent = `${resJson.weather[0].description}`;
                    const background = document.createElement("img");
                    background.src = 'https://openweathermap.org/img/w/'+resJson.weather[0].icon+'.png';
                    bg.style.backgroundImage=`url(${'https://openweathermap.org/img/w/'+resJson.weather[0].icon+'.png'}),linear-gradient(to right top, #65dfc9, #6cdbeb)`;

                })
                .catch((error) => console.log(error));
        }
        getWeather();
    }


} 
if( navigator.geolocation.getCurrentPosition(getPosition)==undefined){
    function getIplocation(){
        window.fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=aee7ebb16b4e43c1b96f1ef014a3b811`)
        .then(response=> response.json())
        .then(responseJson => {
           localStorage.setItem('city',JSON.stringify(responseJson.city))
        })
    }
    getIplocation();
    function getWeather2(){
        const city = localStorage.getItem('city');
        const cityOk = JSON.parse(city);
        window.fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityOk},fr&lang=fr&units=metric&appid=69012ee404da614e52f21e63c243c1ed`)
        .then(res => res.json())
                .then(resJson => {
                    loc.textContent = `${resJson.name}`;
                    temp.textContent = `${resJson.main.temp} °C`;
                    const img = document.createElement("img");
                    img.src = 'https://openweathermap.org/img/w/'+resJson.weather[0].icon+'.png';
                    icon.appendChild(img);
                    infos.textContent = `${resJson.weather[0].description}`;
                    const background = document.createElement("img");
                    background.src = 'https://openweathermap.org/img/w/'+resJson.weather[0].icon+'.png';
                    bg.style.backgroundImage=`url(${'https://openweathermap.org/img/w/'+resJson.weather[0].icon+'.png'}),linear-gradient(to right top, #65dfc9, #6cdbeb)`;

                })
                .catch((error) => console.log(error));
    }
    getWeather2();
}else{
    console.log('utilisateur géolocalisé');
}

