import { colorsRgb, wikiColorsRgb } from '../data/colors.js';
const RGBCOLORS = { ...wikiColorsRgb, ...colorsRgb };

const handleSubmit = e => {
  e.preventDefault();

  // get values from form
  const form = document.querySelector('.catfood-cost-calc');

  const calDensity = Number(form.querySelector('*[name="calorie-density"]').value); // calories per kg
  const mass = Number(form.querySelector('*[name="mass"]').value); // grams of food
  const cost = Number(form.querySelector('*[name="cost"]').value); // cost for that amount of grams of food
  const dailyCalReq = Number(form.querySelector('*[name="daily-calories"]').value); // daily calories required

  console.log(calDensity, mass, cost, dailyCalReq);

  // calculate the monthly cost
  const MONTH = 30.4167; // days in a month
  const monthlyKcals = dailyCalReq * MONTH; // kcals
  const kgPerMonth = monthlyKcals / calDensity; // kg
  const costPerKg = 1000 * cost / mass; // $ per kg
  const monthlyCost = kgPerMonth * costPerKg; // $ per month

  // update the form with the results
  form.querySelector('*[name="answer"]').value = `$${Math.round(monthlyCost * 100) / 100}`;
};

export default options => {
  const opts = {
    ...options
  };

  // create parent element
  const parent = document.createElement('form');
  parent.className = 'catfood-cost-calc';

  // create inputs
  const inputs = [
    { name: 'calorie-density', placeholder: 'calorie density (kcal/kg)' },
    { name: 'mass', placeholder: 'mass (grams)' },
    { name: 'cost', placeholder: 'cost ($)' },
    { name: 'daily-calories', placeholder: 'daily-calories (kcal)', value: 300 }
  ].map(attrs => {
    const input = document.createElement('input');
    input.type = 'text';
    for (let key of Object.keys(attrs)) input.setAttribute(key, attrs[key]);
    return input;
  });

  // create the answer
  const answer = document.createElement('input');
  answer.type = 'text';
  answer.readOnly = true;
  answer.setAttribute('name', 'answer');

  // create the submit button
  const btnSubmit = document.createElement('button');
  btnSubmit.type = 'submit';
  btnSubmit.innerHTML = 'calculate';
  btnSubmit.addEventListener('click', handleSubmit);

  // append children and return parent
  parent.append(...inputs, btnSubmit, answer);
  return parent;
};
