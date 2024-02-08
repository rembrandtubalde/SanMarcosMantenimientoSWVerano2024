/* eslint-disable no-undef */
import React from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';

export const Map = ({
  coordinates,
  places,
  setService,
  service,
  setPlaces,
  searched
}) => {
  return (
    <>
      <GoogleMapReact
        yesIWantToUseGoogleMapApiInternals
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{
          fullscreenControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          gestureHandling: 'none',
        }}
        onChange={() => {
          service?.nearbySearch({
            location: coordinates,
            radius: 500,
            type: ['restaurant', 'bar', 'cafe', 'museum', 'shopping_mall', 'zoo']
          }, (results, status) => {
            if (status === 'OK') {
              setPlaces(results.filter(({ photos, business_status }) => photos?.[0]?.getUrl({ maxWidth: 200, maxHeight: 200 }) !== undefined && business_status));
            }
          });
        }}
        onGoogleApiLoaded={({ map, maps }) => {
          service = new maps.places.PlacesService(map);
          setService(service);
        }}
      >
        {places?.map((place) => {
          const thumbnailUrl = place.photos?.[0]?.getUrl({ maxWidth: 200, maxHeight: 200 });
          const isPlace = place.business_status;

          if (thumbnailUrl && isPlace) {
            return (
              <div
                key={place.place_id}
                className='location__marker'
                lat={place.geometry?.location.lat()}
                lng={place.geometry?.location.lng()}
                title={place.name}
                style={{ color: searched?.place_id === place.place_id ? 'var(--primary-color)' : 'var(--error-red)' }}
              >
                <i className="fa-solid fa-location-dot"></i>
              </div>
            );
          }
        })}
      </GoogleMapReact>
    </>
  );
};

Map.propTypes = {
  coordinates: PropTypes.object.isRequired,
  places: PropTypes.array,
  setService: PropTypes.func,
  service: PropTypes.object,
  setPlaces: PropTypes.func,
  searched: PropTypes.object,
};
