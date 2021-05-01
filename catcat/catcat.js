//import request from 'superagent';

// define functions
function calcMonthlyCosts(kcalPerKg, pricePerKg, dailyKcal = 300) {
    const monthlyKcal = dailyKcal * (365 / 12);
    return (monthlyKcal / kcalPerKg) * pricePerKg;
}

// grab dom elements
const frmMonthlyCost = document.querySelector('.monthly-cost-calc');
const midday = document.querySelector('.midday');

// define functions
/*async function getMidday() {
    response = await request.get('https://api.sunrise-sunset.org/json?lat=33.7846&lng=117.8265');
    midday.textContent = response.body.results.solar_noon;
}*/

// add event listeners 
frmMonthlyCost.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(frmMonthlyCost);
    const results = calcMonthlyCosts(formData.get('calorie-density'), 1000 * formData.get('product-price') / formData.get('product-mass'));
    document.querySelector('.calc-results').textContent = `$${Math.round(results * 100) / 100}`;
});

// initialize page