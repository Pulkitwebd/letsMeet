import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const options = {
  zoomControl: true,
};

const LocationSearch = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyA9MOfhE4MKuNCe5Ynppj09kOkMzomUAjQ",
  });

  const [location, setLocation] = useState({ lat: 22.719568, lng: 75.857727 });
  const [address, setAddress] = useState("");
  const [autocomplete, setAutocomplete] = useState(null);
  const [marker, setMarker] = useState({ lat: 22.719568, lng: 75.857727 });
  const [infoOpen, setInfoOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isLoaded && inputRef.current) {
      const autoComplete = new window.google.maps.places.Autocomplete(
        inputRef.current,
        { types: ["geocode"] }
      );
      console.log(autoComplete)
      setAutocomplete(autoComplete);
      autoComplete.addListener("place_changed", onPlaceChanged);
    }
  }, [isLoaded, inputRef]);

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      console.log("place", place);
      if (place.geometry) {
        const { lat, lng } = place.geometry.location;
        console.log("lat, lng", lat, lng);
        setLocation({ lat, lng });
        setAddress(place.formatted_address);
        setMarker({
          lat,
          lng,
        });
      } else {
        alert("Invalid place");
      }
    }
  };

  const onMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    // setLocation({ lat, lng });
    setMarker({
      lat,
      lng,
    });
  };

  const onMarkerClick = () => {
    setInfoOpen(!infoOpen);
  };

  const settingAddress = (e) => {
    e.preventDefault();
    setAddress(e.target.value);
    // setAutocomplete(e.target.value)
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return (
    <div>
      {isLoaded && (
        <>
          <input
            id="search-input"
            type="text"
            placeholder="Search for location"
            value={address}
            onChange={(e) => settingAddress(e)}
          />
          <button type="button" onClick={onPlaceChanged}>Search</button>
          <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={14}
            center={location}
            options={options}
            onClick={onMarkerDragEnd}
          >
            {marker && (
              <Marker
                position={marker}
                draggable={true}
                onDragEnd={onMarkerDragEnd}
                onClick={onMarkerClick}
              />
            )}

            {infoOpen && (
              <InfoWindow position={marker} onCloseClick={onMarkerClick}>
                <div>
                  <h4>Marker Location</h4>
                  <p>Latitude: {marker.lat}</p>
                  <p>Longitude: {marker.lng}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </>
      )}
    </div>
  );
};

export default LocationSearch;
