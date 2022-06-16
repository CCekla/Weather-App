//npx tailwindcss -i ./src/style.css -o ./public/style.css --watch

//get form input
const weatherForm = document.querySelector('form');

const card = document.querySelector('.card');
const weatherCity = document.querySelector('.city');
const weatherName = document.querySelector('.weather-name');
const temperatures = document.querySelector('.temperature');

const cardImg = document.querySelector('img.time');
const icon = document.querySelector('.weather-icon img');

const forecast = new Forecast();

let degF = 0;
let degC = 0;
let temp = 0;
let degType = '';

//toggle from C to F

const toggle = document.getElementById('switch');

const tempSwitch = () => {

    if(!toggle.classList.contains('farn')){
        temp = degC;
        degType = '&deg;C';
    }else{
        temp = degF;
        degType = '&deg;F';
    }
    
    temperatures.innerHTML = `<span>${temp}</span><span>${degType}</span>`;
};

toggle.addEventListener('click', event =>{
    //console.log(event.target);
    toggle.classList.toggle('farn');
    tempSwitch();
});

//update UI
const updateUi = (data) => {
    //destructured properties
    const {details, weather} = data;

    degC = weather.Temperature.Metric.Value;
    degF = weather.Temperature.Imperial.Value;

    tempSwitch();

    weatherCity.innerHTML = `${details.EnglishName}`;
    weatherName.innerHTML = `${weather.WeatherText}`;
    temperatures.innerHTML = `<span>${temp}</span><span>${degType}</span>`;
    
    //display time of the day
    
    let url = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';

    cardImg.setAttribute('src', url);
    
    //display icon

    const iconNum = weather.WeatherIcon;
    //console.log(iconNum);
    icon.setAttribute('src', `img/icons/${iconNum}.svg`);

    //remove display none if present
    if(card.classList.contains('hidden')){
        card.classList.remove('hidden');
    }
};

weatherForm.addEventListener('submit', event => {
    event.preventDefault();
    //get the city searched
    const city = weatherForm.search.value.trim();
    //empty the field
    weatherForm.reset();

    //update with new city
    forecast.updateCity(city).then(data => updateUi(data)).catch(error => console.log(error));

    //set localStorage
    localStorage.setItem('city', city);
});

//check if there's already a city stored in localStorage
if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city')).then(data => updateUi(data)).catch(error => console.log(error));
}


