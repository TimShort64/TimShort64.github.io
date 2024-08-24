document.addEventListener('DOMContentLoaded', function () {
    let allCars = [];

    fetch('https://raw.githubusercontent.com/MatthewBHShort/DadsGarage/main/dadsCars.csv')
        .then(response => response.text())
        .then(data => {
            allCars = Papa.parse(data, { header: true }).data;
            displayCars([]);
            addSearchFunctionality();
        });

    function displayCars(cars) {
        const carsList = document.getElementById('cars-list');
        carsList.innerHTML = '';
        cars.forEach(car => {
            const carItem = document.createElement('div');
            carItem.classList.add('car-item');
            carItem.innerHTML = `
                <h2>${car.Make} ${car.Model} (${car['1st Year of Production']} - ${car['Last Year of Production']})</h2>
                <p><strong>Total Built:</strong> ${car['Total # of Base Model Built']}</p>
                <p>${car.Highlights}</p>
            `;
            carsList.appendChild(carItem);
        });
    }

    function addSearchFunctionality() {
        const searchInput = document.getElementById('search');
        const searchButton = document.getElementById('search-button');

        searchInput.addEventListener('keyup', function (event) {
            if (event.key === 'Enter') {
                performSearch();
            }
        });

        searchButton.addEventListener('click', function () {
            performSearch();
        });

        function performSearch() {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredCars = allCars.filter(car => 
                (car.Make && car.Make.toLowerCase().includes(searchTerm)) ||
                (car.Model && car.Model.toLowerCase().includes(searchTerm)) ||
                (car['1st Year of Production'] && car['1st Year of Production'].toLowerCase().includes(searchTerm)) ||
                (car['Last Year of Production'] && car['Last Year of Production'].toLowerCase().includes(searchTerm))
            );
            displayCars(filteredCars);
        }
    }
});
