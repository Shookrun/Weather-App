document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const search = document.querySelector('.search-box button');
    const weatherBox = document.querySelector('.weather-box');
    const weatherDetails = document.querySelector('.weather-details');

    search.addEventListener('click', () => {
        const APIKey = '57dc56cd34acd3109836a4701c8166c1';
        const city = document.querySelector('.search-box input').value;

        if (city === '') return;

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
            .then(response => response.json())
            .then(json => {
                if (json.cod === '404') {
                    alert('City not found');
                    return;
                }

                const image = document.querySelector('.weather-box img');
                const temperature = document.querySelector('.weather-box .temperature');
                const description = document.querySelector('.weather-box .description');
                const humidity = document.querySelector('.weather-details .humidity span');
                const wind = document.querySelector('.weather-details .wind span');

                // Hide elements before updating
                weatherBox.classList.remove('show-element');
                weatherDetails.classList.remove('show-element');
                image.style.opacity = 0;
                temperature.style.opacity = 0;
                description.style.opacity = 0;

                setTimeout(() => {
                    switch (json.weather[0].main) {
                        case 'Clear':
                            image.src = './assets/images/clear.png';
                            break;
                        case 'Rain':
                            image.src = './assets/images/rain.png';
                            break;
                        case 'Snow':
                            image.src = './assets/images/snow.png';
                            break;
                        case 'Clouds':
                            image.src = './assets/images/cloud.png';
                            break;
                        case 'Mist':
                        case 'Haze':
                            image.src = './assets/images/mist.png';
                            break;
                        default:
                            image.src = './assets/images/cloud.png';
                    }

                    temperature.innerHTML = `${json.main.temp.toFixed(1)}°C`;
                    description.innerHTML = `${json.weather[0].description}`;
                    humidity.innerHTML = `${json.main.humidity}%`;
                    wind.innerHTML = `${json.wind.speed} km/h`;

                    // Show elements with animation
                    weatherBox.classList.add('show-element');
                    weatherDetails.classList.add('show-element');
                    image.style.opacity = 1;
                    temperature.style.opacity = 1;
                    description.style.opacity = 1;
                }, 500); // Wait for the hide animation to finish

                container.style.height = '590px'; // Adjust container height as needed
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    });
});
