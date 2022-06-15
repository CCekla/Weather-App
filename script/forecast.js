
const key = KEY;

//get the weather data

const getWeather = async(cityId) => {
    const endpoint = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const request = `${cityId}?apikey=${key}`;

    const response = await fetch(endpoint + request);
    const data = await response.json();

    return data[0];

}

// get the city code back, async request

const getCity = async(city) => {

    const endpoint = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const request = `?apikey=${key}&q=${city}`;

    const response = await fetch(endpoint + request);
    const data = await response.json();

    return data[0]; //closest city match
};

/*getCity('milan').then(data => {
    return getWeather(data.Key);
}).then(data => {
    console.log(data);
}).catch(err => console.log(err));*/