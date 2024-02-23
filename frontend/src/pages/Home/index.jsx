import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ListPlaces } from '../../components/ListPlaces';
import { Location } from '../../components/Location';
import { initializeFavorites } from '../../redux/state/favsSlice';
import { Title } from '../../styled-components/Text';
import { getPlaces } from '../../services/api/places';
import { Paragraph } from '../../styled-components/Text';

import './index.css';

export const Home = () => {
  const user = useSelector(state => state.auth.user);
  const [places, setPlaces] = useState([]);
  const dispatch = useDispatch();
  const placesNearMe = useSelector(state => state.placesNearby);

  useEffect(() => {
    getPlaces().then(data => {
      setPlaces(data.data);
      console.log(data.data);
    }).catch(err => {
      console.log(err);
    });
    dispatch(initializeFavorites(user.id));
    console.log('places nearby', placesNearMe);
  }, [dispatch]);

  return (
    <>
      <div className='location__places'>
        <div className='location__recommended'>
          <Title marginBottom='2rem'>Más visitados</Title>
          <div className='location__list' style={{ gap: 20 }}>
            {places.length > 0 ? (
              <ListPlaces places={places} toFormat toFavorite fixed route='buscar/'  />
            ) : (
              <Paragraph>Aún no hay recomendaciones</Paragraph>
            )}
          </div>
        </div>
        <div className='location__favorites'>
          <Title marginBottom='2rem'>Cerca de ti</Title>
          <div className='location__list' style={{ gap: 30 }}>
            {places.length > 0 ? (
              <ListPlaces places={placesNearMe} toFormat toFavorite fixed route='buscar/' />
            ) : (
              <Paragraph>No encontramos lugares alrededor tuyo</Paragraph>
            )}
          </div>
        </div>
      </div>
      <div className='location__map'>
        <Title marginBottom='2rem'>Tu ubicación</Title>
        <Location />
      </div>
    </>
  );
};
