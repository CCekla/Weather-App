class Forecast {
    constructor(){
        this.key = KEY;
        this.cityURL = 'http://dataservice.accuweather.com/locations/v1/cities/search';
        this.weatherURL = 'http://dataservice.accuweather.com/currentconditions/v1/';
    }

    async updateCity(city){
        const details = await this.getCity(city);
        const weather = await this.getWeather(details.Key);

        return {
            //shorthand object notation name of prop === value
            details,
            weather
        };
    }

    async getCity(city) {
        const request = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.cityURL + request);
        const data = await response.json();

        return data[0]; //closest city match
    }

    async getWeather(cityId){
        const request = `${cityId}?apikey=${this.key}`;
        const response = await fetch(this.weatherURL + request);
        const data = await response.json();

        return data[0];
    }
}