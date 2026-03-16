import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '8px'
};

const defaultCenter = {
  lat: 40.7128, // Default fallback (e.g. NYC) or center of your service area
  lng: -74.0060
};

const MapView = ({ markers }) => {
  // markers format: [{ id: string, name: string, lat: number, lng: number, role: 'donor'|'org'|'agent' }]
  
  // Auto-center map based on first marker if available
  const center = markers && markers.length > 0 
    ? { lat: markers[0].lat, lng: markers[0].lng } 
    : defaultCenter;

  const getMarkerIcon = (role) => {
    switch(role) {
       case 'donor': return 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
       case 'org': return 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
       case 'agent': return 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
       default: return 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
    }
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
      >
        {markers && markers.map(marker => (
          <Marker 
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            title={marker.name}
            icon={getMarkerIcon(marker.role)}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapView;
