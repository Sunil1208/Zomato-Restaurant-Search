const searchForm = document.querySelector('form');
const rTemp = document.querySelector('template');
const resultArea = document.querySelector('#restaurant-results');

searchForm.addEventListener('submit', async e => {
    e.preventDefault();
    // const fd = new FormData(e.target);
    const query = (e.target.querySelector('#restaurant-name').value);
    // if(fd.get('restaurant-name')===''||fd.get('city-name')==='') {
    //     return;
    // }
    if (query === '') {
        return;
    }
    e.target.querySelector('#restaurant-name').value = '';
    e.target.querySelector('#city-name').value = '';
    const res = await fetch('/search', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        body: '${query}'
    })
    const json = await res.json();
    //console.log(json);
    populateData(json.restaurants);
});

function populateData(results) {
    results.forEach(results => {
    const newResults = rTemp.content.cloneNode(true);
    newResults.querySelector('.result-title').innerText = results.name;
    newResults.querySelector('.result-neighborhood').innerText = results.location.locality;
    newResults.querySelector('.result-address').innerText = results.location.address;
    newResults.querySelector('.result-price').innerText = results.priceRange;
    resultArea.appendChild(newResults)
    });
}