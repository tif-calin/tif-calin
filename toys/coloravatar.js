const COLORS = 16777215; // number of colors in rgb integer space

const makeColor = (hash, prime = 211) => {
  let colorVal = (hash + prime) % 255;
  let color = '#';

  for (let i = 0; i < 3; i++) {
    colorVal = (colorVal * prime) % 255;
    color += (colorVal < 16) ? '0' + colorVal.toString(16) : colorVal.toString(16);
  }

  return color;
}

const coloravatar = (loud = false) => {
  const parent = document.createElement('div');
  parent.className = 'color-avatar';

  // create input and div
  const inpName = document.createElement('input');
  const divAva = document.createElement('div');
  inpName.type = 'text';
  divAva.className = 'avatar';

  // add change handler to input
  inpName.addEventListener('input', e => {
    // remove whitespace from input
    e.target.value = e.target.value.trim();

    // turn input into hex color
    let hash = parseInt(e.target.value
      .split('')
      .reduce((acc, char) => acc += char.charCodeAt(0), '')
    ) % 255;
    
    const deg = (hash % 360);

    if (loud) console.log(deg, makeColor(hash, 71), makeColor(hash, 181));

    // update color of avatar
    document.querySelector('.avatar').style.background = `linear-gradient(
      ${deg}deg, 
      ${makeColor(hash)}, 
      ${makeColor(hash, 181)}
    `;
  });

  // append children and return parent
  parent.append(inpName, divAva);
  return parent;
}

export default coloravatar;