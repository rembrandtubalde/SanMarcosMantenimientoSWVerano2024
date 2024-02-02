/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { useDispatch } from 'react-redux';

import './index.css';
import { setPlacesNearby } from '../../redux/state/placeSlice';

export const Location = () => {
  const dispatch = useDispatch();
  const [coordinates, setCoordinates] = useState({});

  const apiIsLoaded = (map, maps, center) => {
    console.log('maps', maps);
    console.log('map', map);
    const service = new maps.places.PlacesService(map);
    console.log('service', service);
    service?.nearbySearch({
      location: coordinates,
      radius: 500,
      type: ['restaurant', 'bar', 'cafe', 'museum', 'shopping_mall', 'zoo']
    }, (results, status) => {
      console.log('status: ', status);
      if (status === 'OK') {
        dispatch(setPlacesNearby(results.filter(({ photos, business_status }) => photos?.[0]?.getUrl({ maxWidth: 200, maxHeight: 200 }) !== undefined && business_status)));
      }
    });

    return new google.maps.Circle({
      strokeColor: '#D387FC',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#D387FC',
      fillOpacity: 0.2,
      map,
      center: center,
      radius: 600
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
      console.log('coordinates', coordinates);
    });
  }, []);

  return (
    <>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        yesIWantToUseGoogleMapApiInternals
        defaultZoom={15}
        margin={[50, 50, 50, 50]}
        options={{
          fullscreenControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          zoomControl: false,
          gestureHandling: 'none'
        }}
        onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, coordinates)}
        setCoordinates={setCoordinates}
      >
        <div
          className='location__marker'
          lat={coordinates.lat}
          lng={coordinates.lng}
        >
          <i className="fa-solid fa-location-dot"></i>
        </div>
      </GoogleMapReact>
    </>
  );
};