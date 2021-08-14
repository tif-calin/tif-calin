import { getPrefs, updatePrefs } from './utils/localStorage.js';
import solarNoon from './toys/solarnoon.js';
import colorAvatar from './toys/coloravatar.js';
import colorNamer from './toys/colornamer.js';
import catfoodCostCalc from './toys/catfoodcostcalc.js';

// grab dom elements
const settingsContainer = document.getElementById('settings-container');
const toyContainer = document.querySelector('#toy-container');

// setup state
let prefs = {};
const toyInfo = {
  solarnoon: {
    name: 'solar noon',
    description: '',
    renderer: solarNoon,
  },
  coloravatar: {
    name: 'color avatar',
    description: '',
    renderer: colorAvatar,
  },
  colornamer: {
    name: 'color namer',
    description: '',
    renderer: colorNamer,
  },
  catfoodcostcalc: {
    name: 'catfood cost calculator',
    description: '',
    renderer: catfoodCostCalc
  }
};

// functions
const loadToy = async key => {
  const toyTitle = document.createElement('h3');
  toyTitle.name = key;
  toyTitle.innerHTML = toyInfo[key].name;
  toyTitle.classList.add('toy-title');
  const toy = await toyInfo[key].renderer(prefs['opts_' + key]);
  toy.classList.add('toy');
  toy.name = key;
  toyContainer.append(toyTitle, toy);
};

// get prefs from localStorage if exist
const loadPrefs = () => {
  prefs = {
    show_solarnoon: false,
    show_coloravatar: true,
    show_colornamer: false,
    show_catfoodcostcalc: true,
    opts_solarnoon: {},
    opts_coloravatar: { loud: true, approximateColorNames: true },
    opts_colornamer: { corsProxy: true },
    opts_catfoodcostcalc: {},
    ...getPrefs()
  };
  updatePrefs(prefs);

  // generate checkboxes for each toy
  for (let toy of Object.keys(toyInfo)) {
    const chk = document.createElement('input');
    chk.type = 'checkbox';
    chk.name = toy;
    if (prefs['show_' + toy]) chk.checked = true;
    const lbl = document.createElement('label');
    lbl.textContent = toyInfo[toy].name;

    // add event listener to handle checkbox change
    chk.addEventListener('change', async e => {
      const key = e.target.name;

      // // load or remove the toy
      // if (!prefs['show_' + key]) loadToy(key);
      // else document.querySelectorAll(`.toy[name=${key}], .toy-title[name=${key}]`).forEach(el => el.remove());

      // update state
      prefs['show_' + toy] = chk.checked;
      // update localStorage
      updatePrefs(prefs);
    });

    settingsContainer.append(chk, lbl);
  }
};
loadPrefs()

// load toys
Object.keys(toyInfo).forEach(async key => {
  if (prefs['show_' + key]) loadToy(key);
});
