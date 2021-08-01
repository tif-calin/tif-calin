import { hex2rgb, rgb2hex } from '../utils/utils.js';

const CORS_PROXY = 'https://api.allorigins.win/get?url=';
const URL = 'https://colornames.org/search/results/?type=exact&query=';

const fetchTopHex = async (query, corsProxy = true) => {
  const res = corsProxy
    ? await fetch(`${CORS_PROXY}${encodeURIComponent(URL + query)}`).then(res => res.json()).then(json => json.contents)
    : await fetch(URL + query).then(res => res.text())
  ;
  const html = (new DOMParser()).parseFromString(res, 'text/html');

  const allTallies = [...html.querySelectorAll('div.is-mobile > div > div.buttons > button > span.tally')].map(span => parseInt(span.innerHTML));
  const allRaw = [...html.querySelectorAll('a.freshButton')].map(a => a.style.backgroundColor);
  const allHex = allRaw.map(raw => rgb2hex(raw));
  const allRgb = allHex.map(hex => hex2rgb(hex));

  return [allTallies, allRaw, allHex, allRgb];
}

export default options => {
  const opts = {
    corsProxy: true,
    ...options
  };

  // create parent element
  const parent = document.createElement('div');
  parent.classList.add('color-namer');

  // create children elements
  const input = document.createElement('input');
  input.type = 'text';
  const span = document.createElement('span');
  const pre = document.createElement('pre');
  pre.appendChild(document.createElement('code'));

  // add event handler for input
  input.addEventListener('change', e => {
    e.target.value = e.target.value.trim();

    fetchTopHex(e.target.value, opts.corsProxy)
      .then(arr => {
        const [tallies, raw, hex, rgb] = arr;

        parent.style.backgroundColor = hex[0];
        span.innerHTML = `out of ${tallies.length} <a target="_blank" href=${URL + e.target.value}>matches</a>, the top match is ${hex[0]} with a tally of ${tallies[0]}`;
        const codeText = `const colors = {
          \t${e.target.value}: '${hex[0]}',
          \t${e.target.value}: [${rgb[0].join(', ')}],\n}
        `.replace(/[ \t\r]+/g, ' ').replace(/\n+ /g, '\n  ');
        pre.children[0].textContent = codeText;
      })
      .catch(err => console.log(err))
    ;
  });

  // append children and return parent
  parent.append(span, input, pre);
  return parent;
};
