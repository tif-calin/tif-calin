// define functions
function calcMonthlyCosts(kcalPerKg, pricePerKg, dailyKcal = 300) {
    const monthlyKcal = dailyKcal * (365 / 12);
    return (monthlyKcal / kcalPerKg) * pricePerKg;
}

// grab dom elements
const frmMonthlyCost = document.querySelector('.monthly-cost-calc');

// add event listeners 
frmMonthlyCost.addEventListener('submit', e => {
    e.preventDefault();
});