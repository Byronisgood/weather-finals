import React, { useState, useEffect } from 'react';
import './style.css';

// Import images
import cloudsIcon from './clouds.png';
import windIcon from './wind.png';
import searchIcon from './search.png';
import humidityIcon from './humidity.png';
import rainIcon from './rain.png';

const App = () => {
  const [city, setCity] = useState('');
  const [temp, setTemp] = useState('');
  const [humidity, setHumidity] = useState('');
  const [wind, setWind] = useState('');
  const [weatherIcon, setWeatherIcon] = useState(cloudsIcon);

  const apiKey = 'e4d474a322c0877f50ad1ce9bfa13d83';

  const handleSearch = async () => {
    try {
      if (!city) {
        return;
      }

      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      setTemp(data.main.temp);
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);

      const weatherConditionCode = data.weather[0].id;
      if (isRaining(weatherConditionCode)) {
        setWeatherIcon(rainIcon);
      } else {
        setWeatherIcon(cloudsIcon);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const isRaining = (weatherCode) => {
    return weatherCode >= 200 && weatherCode < 600;
  };

  useEffect(() => {
    const getCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

          fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
              setCity(data.name);
              setTemp(data.main.temp);
              setHumidity(data.main.humidity);
              setWind(data.wind.speed);

              // Determine weather condition and set appropriate icon
              const weatherConditionCode = data.weather[0].id;
              if (isRaining(weatherConditionCode)) {
                setWeatherIcon(rainIcon);
              } else {
                setWeatherIcon(cloudsIcon);
              }
            })
            .catch((error) => {
              console.error('Error fetching weather data:', error);
            });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    };

    getCurrentLocation();
  }, []); 

  return (
    <div>
      <div className="card">
        <div className="search">
          <input
            id="searchInput"
            type="text"
            placeholder="enter city name"
            spellCheck="false"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button id="searchBtn" onClick={handleSearch}>
            <img src={searchIcon} alt="Search" />
          </button>
        </div>
        <div className="weather">
          <img src={weatherIcon} className="weather-icon" alt="Weather Icon" />
          <h1 className="temp">{temp}&deg;C</h1>
          <h2 className="city">{city}</h2>
          <div className="details">
            <div className="col">
              <img src={humidityIcon} alt="Humidity Icon" />
              <div>
                <p className="humidity">{humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src={windIcon} alt="Wind Icon" />
              <div>
                <p className="wind">{wind} km/h</p>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="about-section">
        <h3>About Us</h3>
        <p>
          Welcome to our weather app! We provide real-time weather information for locations around the world.
        </p>
      </div>

     {/* Contact Us Section */}
<div className="contact-section">
  <h3>Contact Us</h3>
  <p>
    If you have any questions or feedback, feel free to contact us at <a href="https://github.com/Byronisgood">click me</a>.
  </p>

  <h3>My Team</h3>
  <div className="member">
  
    <h4>Byron Alexis R. Reyes</h4>
    <p>Developer/Designer</p>
    <p>Email: <a href="mailto:john@example.com">reyesbyron0503@gmail.com</a></p>
  </div>

  <div className="member">
   
    <h4>Justin Ken Lopez</h4>
    <p>Manager</p>
    <p>Email: <a href="mailto:jane@example.com">justonken@gmail.com</a></p>
  </div>
  <div className="member">
   
    <h4>Patrick M. Padilla</h4>
    <p>programmer na tamad</p>
    <p>Email: <a href="mailto:jane@example.com">patrickpadilla512@gmail.com</a></p>
  </div>

  <div className="member">
   
   <h4>Miguelito Roque</h4>
   <p>Maraming pag kain</p>
   <p>Email: <a href="mailto:jane@example.com">sweetlover69@gmail.com</a></p>
 </div>

 <div className="member">
   
   <h4>John Joseph Capungan</h4>
   <p>Tambayan</p>
   <p>Email: <a href="mailto:jane@example.com">jjcapungan59@gmail.com</a></p>
 </div>
  



</div>


      
    </div>
  );
};

export default App;
