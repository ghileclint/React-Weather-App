import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdWaterDrop } from "react-icons/md";
import { FaWind } from "react-icons/fa";
import sun from "./images/sun.png";
import clouds from "./images/clouds.png";
import rain from "./images/rain.png";
import snow from "./images/snow.png";
import thunder from "./images/thunder.png";

import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);

  const API_KEY = "9ec8cb8e194e6cb1b623209bb1d4357b";
  const LINK = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  const handleFetch = async () => {
    try {
      const res = await fetch(LINK);
      const data = await res.json();
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const renderIcon = () => {
    const weather = data?.weather?.[0]?.main;
    console.log(weather);

    switch (weather) {
      case "Clouds":
        return <img className="previewImg" src={clouds} alt="" />;
      case "Rain":
        return <img className="previewImg" src={rain} alt="" />;
      case "Snow":
        return <img className="previewImg" src={snow} alt="" />;
      case "Sun":
        return <img className="previewImg" src={sun} alt="" />;
      case "Thunder":
        return <img className="previewImg" src={thunder} alt="" />;
      default:
        return <img className="previewImg" src={sun} alt="" />;
    }
  };

  return (
    <div className="container">
      <div className="searchContainer">
        <input
          className="searchBar"
          value={city}
          type="text"
          name="city"
          id="city"
          placeholder="Enter city"
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="searchBtn" onClick={handleFetch}>
          <FaSearch />
        </button>
      </div>
      {renderIcon()}
      <p className="temperature">{Math.round(data?.main?.temp)}°</p>
      <p className="city">{data?.name}</p>
      <div className="infoContainer">
        <div className="infoSubcontainer">
          <MdWaterDrop className="icon" />
          <div>
            <p className="bold">{data?.main?.humidity}</p>
            <p>Humidity</p>
          </div>
        </div>

        <div className="infoSubcontainer">
          <FaWind className="icon" />
          <div>
            <p className="bold">{data?.wind?.speed}</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
