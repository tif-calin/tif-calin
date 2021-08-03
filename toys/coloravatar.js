import { hex2rgb } from '../utils/utils.js';
import { colorsRgb } from '../data/colors.js';

const COLORS = 256 ** 3; // number of colors in rgb integer space
const PRIMES = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37,
  41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 
  97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 139, 149, 
  151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211,
  223, 227, 229, 233, 239, 241, 251
]; // there are 55 prime numbers that are less than 255. Remember 255 = 3 * 5 * 17

const makeGradient = (hash, numOfColors = 2, deg = 0, gradientType = 'linear', loud = false, onlyArgs = false) => {
  const args = [];

  if (deg) args.push(deg + 'deg');
  for (let i = 0; i < numOfColors; i++) args.push(
    makeColor(hash, PRIMES[Math.max(((i + 1) * 41) % PRIMES.length - 1, 7)])
  );

  if (loud) console.log(`${gradientType}-gradient(${args.join(', ')})`);
  if (onlyArgs) return args;
  return `${gradientType}-gradient(${args.join(', ')})`;
};

const makeColor = (hash, prime = 211) => {
  const hex = (((hash + prime) * prime) % (COLORS - 1)).toString(16);

  return '#' + '0'.repeat(6 - hex.length) + hex;
}

const text2Hash = text => parseInt(text 
  .split('')
  .reduce((acc, char) => (acc * char.charCodeAt(0)) % Number.MAX_SAFE_INTEGER, 1)
) % COLORS;

const approximateColorNames = (hash, num, loud) => {
  const colorsHex = makeGradient(hash, num, null, undefined, false, true);
  const colors = colorsHex.map(hex => hex2rgb(hex));
  const matches = [];

  for (let i = 0; i < num; i++) {
    let distClosest = 999;
    let nameClosest = null;
    Object.entries(colorsRgb).forEach(([key, val]) => {
      const dist = Math.sqrt(
        (colors[i][0] - val[0]) ** 2
        + (colors[i][1] - val[1]) ** 2
        + (colors[i][2] - val[2]) ** 2
      );

      if (dist < distClosest) {
        distClosest = dist;
        nameClosest = key;
      }
    });

    matches.push({
      color: colorsHex[i],
      match: nameClosest,
      dist: distClosest
    });
  }

  if (loud) console.log(matches);

  return matches.map(obj => obj.match).join(', ');
};

const handleInputChange = (targ, opts, spnColorNames) => {
  // remove whitespace from input
  targ.value = targ.value.trim();

  // turn input into hex color
  const hash = text2Hash(targ.value);
  if (opts.loud) console.log(hash);

  // update color of avatar
  const domAvatars = document.querySelectorAll('.avatar');
  for (let i = 0; i < domAvatars.length; i++) {
    domAvatars[i].style.background = makeGradient(hash, i + 2, hash % 360, 'linear', i === domAvatars.length - 1 && opts.loud);
  }

  // approximate color names
  if (opts.approximateColorNames) spnColorNames.textContent = approximateColorNames(text2Hash(targ.value), opts.numberOfAvatars + 1, opts.loud);
};

export default options => {
  // default options
  const opts = {
    loud: false,
    numberOfAvatars: 5,
    approximateColorNames: false,
    colorDistanceBy: 'rgb',
    ...options
  };

  // create parent element
  const parent = document.createElement('div');
  parent.className = 'color-avatar';

  // create input and avatar divs
  const inpName = document.createElement('input');
  const avatars = [];
  for (let i = 0; i < opts.numberOfAvatars; i++) {
    const div = document.createElement('div');
    div.className = 'avatar';
    avatars.push(div);
  }
  inpName.type = 'text';
  inpName.placeholder = 'enter string to get unique color avatars';
  const spnColorNames = document.createElement('span');

  // add change handler to input
  inpName.addEventListener('input', e => handleInputChange(e.target, opts, spnColorNames));

  // append children and return parent
  parent.append(inpName, ...avatars);
  if (opts.approximateColorNames) parent.append(spnColorNames);
  return parent;
}
