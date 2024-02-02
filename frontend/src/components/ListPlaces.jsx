import React from 'react';
import PropTypes from 'prop-types';

import QualifyImage from './QualifyImage';

export const ListPlaces = ({ places, toFavorite, fixed, route }) => {
  return (
    <>
      {places?.map((place) => {
        return (
          <QualifyImage
            key={place.place_id || place.id}
            place={place}
            toFavorite={toFavorite}
            fixed={fixed}
            route={route}
          />
        );
      })}
    </>
  );
};

ListPlaces.propTypes = {
  places: PropTypes.array,
  toFavorite: PropTypes.bool,
  fixed: PropTypes.bool,
  route: PropTypes.string,
};
