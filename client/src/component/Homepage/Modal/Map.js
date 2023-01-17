import React, { useState, useRef } from 'react';
import GoogleMapReact from 'google-map-react';

const Marker = ({ lat, lng, onDragEnd }) => {
  const [position, setPosition] = useState({ lat, lng });
  const markerRef = useRef(null);

  const handleMouseDown = e => {
    e.stopPropagation();
    markerRef.current.style.cursor = 'grabbing';
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = e => {
    setPosition({ lat: e.clientY, lng: e.clientX });
  };

  const handleMouseUp = e => {
    markerRef.current.style.cursor = 'grab';
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
    if (onDragEnd) {
      onDragEnd({ lat: position.lat, lng: position.lng });
    }
  };

  return (
    <div
      ref={markerRef}
      style={{
        position: 'absolute',
        transform: `translate(-50%, -50%)`,
        cursor: 'grab',
        color: 'red'
      }}
      onMouseDown={handleMouseDown}
    >
      📍
    </div>
  );
};

const Map = ({ apiKey }) => {
  const [location, setLocation] = useState({});

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
        defaultZoom={8}
        onClick={({ lat, lng }) => setLocation({ lat, lng })}
      >
        {location.lat && location.lng && (
          <Marker lat={location.lat} lng={location.lng} onDragEnd={newLocation => setLocation(newLocation)} />
        )}
      </GoogleMapReact>
    </div>
  );
};

export default Map;