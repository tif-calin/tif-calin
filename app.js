import { getPrefs, updatePrefs } from './utils/localStorage.js';
import solarNoon from './toys/solarnoon.js';
import colorAvatar from './toys/coloravatar.js';
import colorNamer from './toys/colornamer.js';

// get prefs from localStorage if exist
const prefs = {
  show_solarnoon: true,
  show_coloravatar: true,
  show_colornamer: true,
  opts_solarnoon: {},
  opts_coloravatar: { loud: true, approximateColorNames: true },
  opts_colornamer: { corsProxy: false },
  ...getPrefs()
};

// toy info
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
  }
};

// load toys
const toyContainer = document.querySelector('#toy-container');

Object.keys(toyInfo).forEach(async key => {
  if (prefs['show_'+key]) {
    const toyTitle = document.createElement('h3');
    toyTitle.innerHTML = toyInfo[key].name;
    toyTitle.classList.add('toy-title');
    const toy = await toyInfo[key].renderer(prefs['opts_'+key]);
    toy.classList.add('toy');
    toyContainer.append(toyTitle, toy);
  }
});
