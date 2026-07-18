import React from 'react';
import { useState } from 'react'
import './App.css'

import bgImage from './assets/bg.jpg';



function App() {
  const [city, setCity] = useState("");
  const [weatherData, setweatherData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchWeather = async () => {
      if(city.trim()===""){
      setError("Please Enter a  City Name");
      setweatherData({});
      return;
    }
    setLoading(true);
    setError(null);

    const API_KEY = "05c3daff4685b1994e0fdac6dc093af3";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    try {
      const response = await fetch(url);
      let data = await response.json();
      if (response.ok) {
        setweatherData(data);
      }
   
     else {
        setError("City is not found !");
      }
    } catch (err) {
      setError("Something Went Wrong Please Check the Internet Connection !");
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <>
         <div className="min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat"
   style={{backgroundImage :`linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(${bgImage})`}}
    >
      {/* Card */}
      <div className="flex flex-col items-center gap-6 bg-white p-8 rounded-3xl shadow-2xl w-80">
        <h1
          className="text-4xl font-bold font-thunder"
          style={{ color: "#6b4f4f" }}
        >
          Weather App
        </h1>

        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="border-2 border-[#FFDDB0] rounded-lg p-2 w-full focus:outline-none focus:border-[#FFBE91] transition-all"
        />

        <button
          onClick={searchWeather}
          className="text-white px-6 py-2 bg-[#E68A4D] cursor-pointer active:bg-[#e09e70] transition-all duration-100 rounded-lg font-semibold w-full hover:opacity-90"
        >
          Search
        </button>

        {loading ? (
          <div className="text-center mt-4 text-xl border-4 border-t-orange-500 rounded-full w-8 h-8 animate-spin"></div>
        ) : error ? (
          <div className="text-red-500 text-sm mt-2 text-center">{error}</div>
        ) : weatherData.main ? (
          <div className="text-center mt-4">
            <h1 className="text-3xl font-bold flex justify-center items-center gap-2">
              {weatherData.name}
              <svg
                className="w-4 h-4 MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="WbSunnyIcon"
              >
                <path d="m6.76 4.84-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7 1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91 1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"></path>
              </svg>
            </h1>
            <p className="!text-sm mt-2 text-gray-600">
              Temperature : {weatherData.main.temp}°C
            </p>
            <p className="!text-sm text-gray-600">
              Humidity: {weatherData.main.humidity}%
            </p>
            <p className="!text-sm text-gray-600">
              Min Temp: {weatherData.main.temp_min}°C
            </p>
          </div>
        ) : null}
      </div>
    </div>
    </>
  )
}

export default App
