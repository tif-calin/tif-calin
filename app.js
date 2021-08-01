import solarNoon from './toys/solarnoon.js';
import colorAvatar from './toys/coloravatar.js';

const toyContainer = document.querySelector('#toy-container');

toyContainer.appendChild(await solarNoon());
toyContainer.appendChild(colorAvatar(true));
