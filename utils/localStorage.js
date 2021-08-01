const PREFS = 'PREFS';

const getPrefs = () => {
  const prefs = localStorage.getItem(PREFS);

  return (prefs) ? JSON.parse(prefs) : {};
};

const updatePrefs = prefs => {
  localStorage.setItem(PREFS, JSON.stringify(prefs));
};

export { getPrefs, updatePrefs };
