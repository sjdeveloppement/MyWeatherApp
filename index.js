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
                    console.log(resJson);
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


} else {
    //Detection par l'ip ou formulaire d'entrer de ville et localisation par la ville rentrée
    console.log('rien pour le moment');
    function getWeather2(){

    }
}


