const test = document.getElementById("#test");
const loc = document.querySelector("#location");
const temp = document.querySelector('#temperature');
const icon = document.querySelector('#icon');
const infos = document.querySelector('#infos');
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
                    temp.textContent = `${resJson.main.temp}`;
                    const img = document.createElement("img");
                    img.src = resJson.weather[0].icon;
                    icon.appendChild(img);
                    infos.textContent = `${resJson.weather[0].description}`;
                })
                .catch((error) => console.log(error));
        }
        getWeather();
    }


} else {
    //Detection par l'ip ou formulaire d'entrer de ville et localisation par la ville rentrée
    console.log('rien pour le moment');
}


