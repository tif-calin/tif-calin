const solarNoon = async (lat = 33.685, lng = -117.827) => {
    // get data
    const URL = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`;
    const data = (await fetch(URL).then(res => res.json())).results;
    
    // grab spans from dom
    const spnDayLength = document.getElementById('day-length');
    const spnFromNoon = document.getElementById('from-solar-noon');
    const spnUntilAfter = document.getElementById('until-or-after');
    const spnSolarNoon = document.getElementById('solar-noon');
    const spnSunrise = document.getElementById('sunrise');
    const spnSunset = document.getElementById('sunset');

    const now = new Date();
    const solarNoon = new Date(data.solar_noon);
    solarNoon.setDate(now.getDate());
    solarNoon.setMonth(now.getMonth());
    const sunrise = new Date(data.sunrise);
    const sunset = new Date(data.sunset);

    // update spans
    spnDayLength.innerHTML = Math.round(data.day_length / (360)) / 10;
    spnFromNoon.innerHTML = Math.round((now - solarNoon) / 3600000 );
    spnUntilAfter.innerHTML = (now - solarNoon) > 0 ? 'after' : 'until';
    spnSolarNoon.innerHTML = solarNoon.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    spnSunrise.innerHTML = sunrise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    spnSunset.innerHTML = sunset.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
};

solarNoon();
