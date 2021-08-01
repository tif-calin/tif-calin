import solarNoon from './toys/solarnoon.js';
import colorAvatar from './toys/coloravatar.js';
import colorNamer from './toys/colornamer.js';

const toyContainer = document.querySelector('#toy-container');

toyContainer.appendChild(await solarNoon());
toyContainer.appendChild(colorAvatar({ loud: true, approximateColorNames: true }));
toyContainer.appendChild(colorNamer({}));
