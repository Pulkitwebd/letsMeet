import React, { useState, useEffect } from "react";
import classes from "../Homepage.module.css";
import axios from "axios";
import Select from "react-select";
import { BiCurrentLocation } from "react-icons/bi";

const API_endpoint = `https://api.openweathermap.org/data/2.5/weather?`;
const API_key = `a12f56741f3e535e0f0ab6cf0fcd4ced`;

const City = () => {
  const data = [
    {
      value: 1,
      label: "cerulean",
    },
    {
      value: 2,
      label: "fuchsia rose",
    },
    {
      value: 3,
      label: "true red",
    },
    {
      value: 4,
      label: "aqua sky",
    },
    {
      value: 5,
      label: "tigerlily",
    },
    {
      value: 6,
      label: "blue turquoise",
    },
  ];

  // set value for default selection
  const [selectedValue, setSelectedValue] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [currentCity, setCurrentCity] = useState();

  // handle onChange event of the dropdown
  const handleChange = (e) => {
    setSelectedValue(e.value);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLongitude(position.coords.longitude);
      setLatitude(position.coords.latitude);
    });

    if (latitude != 0 && longitude != 0) {
      let final_endpoint = `${API_endpoint}lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=${API_key}`;
      axios.get(final_endpoint).then((res) => {
        setCurrentCity(res.data.name);
      });
    }
  }, [latitude, longitude]);


  return (
    <div className={classes.city}>
      <h1>City</h1>
      <button>
        <BiCurrentLocation />
        {currentCity}

        <span>X</span>
      </button>

      <button>
        <BiCurrentLocation />
        {/* {data[selectedValue - 1]["label"]} */}
        <span>X</span>
      </button>

      <Select
        placeholder="Select Option"
        // isMulti
        value={data.find((obj) => obj.value === selectedValue)} // set selected value
        options={data} // set list of the data
        onChange={handleChange} // assign onChange function
      />

      {selectedValue && (
        <div style={{ marginTop: 20, lineHeight: "25px" }}>
          <div>
            <b>Selected Value: </b> {selectedValue}
          </div>
        </div>
      )}
    </div>
  );
};

export default City;
