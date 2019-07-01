const weatherForm = document.querySelector('#weather-form');
const search = document.querySelector('.search');
const errorMessage = document.querySelector('.error');
const locationMessage = document.querySelector('.location');
const forecastMessage = document.querySelector('.forecast');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    clearContent(errorMessage);
    clearContent(locationMessage);
    clearContent(forecastMessage);

    errorMessage.textContent = 'Loading...'

    const location = search.value;

    reqURL = `/weather?address=${location}`;

    fetch(reqURL)
        .then(
            (response) => {
                response.json().then((data)=>{
                    if(data.error){
                        errorMessage.textContent = data.error;
                        return;
                    }

                    clearContent(errorMessage);
                    locationMessage.textContent = data.location;
                    forecastMessage.textContent = data.forecast;
                })
            }
        )
    
})

const clearContent = (element) => {
    element.textContent = '';
}