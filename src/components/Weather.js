import React, { useState } from 'react';

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [zip, setZip] = useState('');
  const [error, setError] = useState(null);

  const fetchLatLonFromZip = async () => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${zip},us&limit=1&appid=${apiKey}`);
    const data = await response.json();

    if (data && data.length > 0) {
      return { lat: data[0].lat, lon: data[0].lon };
    } else {
      throw new Error('Unable to fetch location data');
    }
  };

  const fetchData = async () => {
    try {
      const locationData = await fetchLatLonFromZip();
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${locationData.lat}&lon=${locationData.lon}&units=imperial&appid=${apiKey}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      if (data.cod !== 200) {
        setError(data.message);
      } else {
        setWeatherData(data);
        setError(null);
      }

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section id="weather-section">
      <h2>Weather</h2>
      <div id="weather-data">
        <input
          type="text"
          placeholder="Enter zip code"
          value={zip}
          onChange={e => setZip(e.target.value)}
        />
        <button onClick={fetchData}>Get Weather</button>
        {error && <p>Error: {error}</p>}
        {weatherData && weatherData.main && weatherData.weather && (
          <>
            <p>Temperature: {weatherData.main.temp} F</p>
            <p>Condition: {weatherData.weather[0].description}</p>
          </>
        )}
      </div>
    </section>
  );
}

export default Weather;
