import data from '../data/portfolios.js';

const populateStats = (dom, data) => {
  const stats = {
    total: data.length,
  };

  dom.textContent = Object.keys(stats)
    .map(key => `${key}: ${stats[key]}`)
    .join('\n')
  ;
};

const populateList = (dom, data) => {
  data.forEach(site => {
    const item = document.createElement('li');

    // create top
    const top = document.createElement('span');
    const name = document.createElement('a');
    name.textContent = site.name;
    name.href = site.site;
    const url = document.createElement('span');
    url.textContent = site.site.slice(site.site.indexOf('/') + 2, -1);
    top.append(name, url);

    // create bottom
    const bottom = document.createElement('span');
    bottom.innerHTML = site.desc;

    // append item to list
    item.append(top, bottom);
    dom.appendChild(item);
  });
};

populateList(
  document.querySelector('main > ul'),
  data
);

populateStats(
  document.querySelector('main > div'),
  data
);
