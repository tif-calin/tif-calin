import { hex2rgb, rgb2hex } from '../utils/utils.js';

const CORS_PROXY = 'https://api.allorigins.win/get?url=';
const URL = 'https://colornames.org/search/results/?type=exact&query=';

const fetchTopHex = async (query, corsProxy = true) => {

  const res = corsProxy
    ? await fetch(`${CORS_PROXY}${encodeURIComponent(URL + query)}`).then(res => res.json()).then(json => json.contents)
    : await fetch(URL + query).then(res => res.text())
  ;
  const html = (new DOMParser()).parseFromString(res, 'text/html');

  const rgbRaw = html.querySelector('a.freshButton').style.backgroundColor;
  const hex = rgb2hex(rgbRaw);
  const rgb = hex2rgb(hex);
  const tally = parseInt(html.querySelector('div.buttons > button > span.tally').textContent);

  return [hex, rgb, tally];
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
        parent.style.backgroundColor = arr[0];
        span.textContent = `the top match is ${arr[0]} with a tally of ${arr[2]}`;
        const codeText = `const colors = {
          \t${e.target.value}: '${arr[0]}',
          \t${e.target.value}: [${arr[1].join(', ')}],\n}
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
