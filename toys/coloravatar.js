const COLORS = 256 ** 3; // number of colors in rgb integer space
const PRIMES = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37,
  41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 
  97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 139, 149, 
  151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211,
  223, 227, 229, 233, 239, 241, 251
]; // there are 55 prime numbers that are less than 255. Remember 255 = 3 * 5 * 17

const makeGradient = (hash, numOfColors = 2, deg = 0, gradientType = 'linear-gradient', loud = false) => {
  const args = [];

  if (deg) args.push(deg + 'deg');
  for (let i = 0; i < numOfColors; i++) args.push(
    makeColor(hash, PRIMES[Math.max(((i + 1) * 41) % (PRIMES.length - 1), 6)])
  );

  if (loud) console.log(`${gradientType}(${args.join(', ')})`);
  return `${gradientType}(${args.join(', ')})`;
};

const makeColor = (hash, prime = 211) => {
  const hex = (((hash + prime) * prime) % (COLORS - 1)).toString(16);

  return '#' + '0'.repeat(6 - hex.length) + hex;
}

const coloravatar = (loud = false) => {
  const parent = document.createElement('div');
  parent.className = 'color-avatar';

  // create input and avatar divs
  const inpName = document.createElement('input');
  const avatars = [];
  for (let i = 0; i < 5; i++) {
    const div = document.createElement('div');
    div.className = 'avatar';
    avatars.push(div);
  }
  inpName.type = 'text';

  // add change handler to input
  inpName.addEventListener('input', e => {
    // remove whitespace from input
    e.target.value = e.target.value.trim();

    // turn input into hex color
    const hash = parseInt(e.target.value
      .split('')
      .reduce((acc, char) => (acc * char.charCodeAt(0)) % Number.MAX_SAFE_INTEGER, 1)
    ) % COLORS;
    
    const deg = (hash % 360);

    if (loud) console.log(hash);

    // update color of avatar
    const avatars = document.querySelectorAll('.avatar');
    for (let i = 0; i < avatars.length; i++) {
      avatars[i].style.background = makeGradient(hash, i + 2, deg, 'linear-gradient', loud);
    }
    // document.querySelectorAll('.avatar').style.background = `linear-gradient(
    //   ${deg}deg, 
    //   ${makeColor(hash)}, 
    //   ${makeColor(hash, 181)}
    // `;
  });

  // append children and return parent
  parent.append(inpName, ...avatars);
  return parent;
}

export default coloravatar;