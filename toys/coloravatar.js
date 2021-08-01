const COLORS = 16777215; // number of colors in rgb integer space

const coloravatar = () => {
  const parent = document.createElement('div');
  parent.className = 'color-avatar';

  // create input and div
  const inpName = document.createElement('input');
  const divAva = document.createElement('div');
  inpName.type = 'text';
  divAva.className = 'avatar';

  // add change handler to input
  inpName.addEventListener('change', e => {
    // remove whitespace from input
    e.target.value = e.target.value.trim();

    // turn input into hex color
    let hash = e.target.value.split('').reduce((acc, char) => acc += char.charCodeAt(0), '');
    hash = parseInt(hash) % COLORS;
    
    const deg = '' + (hash % 360);
    const hex1 = hash.toString(16);
    const hex2 = ((hash * 8008) % COLORS).toString(16);

    // update color of avatar
    document.querySelector('.avatar').style.background = `linear-gradient(${deg}deg, #${hex1}, #${hex2}`;
  });


  // append children and return parent
  parent.append(inpName, divAva);
  return parent;
}

export default coloravatar;