document.addEventListener("DOMContentLoaded", function () {

    fetch("https://restcountries.com/v3.1/all")
        .then(response => response.json())
        .then(data => {

            data.forEach(country => {
                createCountryCard(country);
            });
        })
        .catch(error => console.error("Error fetching countries:", error));

    
    function createCountryCard(country) {
        
        const card = document.createElement("div");
        card.classList.add("col-lg-4", "col-sm-12", "mb-4");

        const cardContainer = document.getElementById("countryCardsContainer");
        cardContainer.appendChild(card);

        
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");

        const cardHeader = document.createElement("div");
        cardHeader.classList.add("card-header");
        cardHeader.innerText = country.name.common;

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        
        const cardContent = `
            <p><strong>Flag:</strong> <img src="${country.flags.svg}" alt="Flag" style="height:100px;"></p>
            <p><strong>Capital:</strong> ${country.capital}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Latlng:</strong> ${country.latlng}</p>
            <p><strong>Country Code:</strong> ${country.cca2}</p>
        `;

        
        const cardButton = document.createElement("button");
        cardButton.classList.add("btn", "btn-primary");
        cardButton.innerText = "Get Weather";
        cardButton.addEventListener("click", () => getWeather(country));

        
        card.appendChild(cardElement);
        cardElement.appendChild(cardHeader);
        cardElement.appendChild(cardBody);
        cardBody.innerHTML = cardContent;
        cardBody.appendChild(cardButton);
    }

    function getWeather(country) {
        const { latlng } = country;
        const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(weatherData => {
                
                console.log("Weather Data:", weatherData);
            })
            .catch(error => console.error("Error fetching weather data:", error));
    }
});
