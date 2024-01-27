import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ListPlaces } from '../../components/ListPlaces';
import { Location } from '../../components/Location';
import { initializeFavorites } from '../../redux/state/favsSlice';
import { SubTitle, Title } from '../../styled-components/Text';

import './index.css';

export const Favorites = () => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.favorites);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    console.log(favorites);
    dispatch(initializeFavorites(user.id));
  }, [dispatch]);

  return (
    <>
      <div className='favorites__list'>
        <Title marginBottom='2rem'>Favoritos</Title>
        <div className='favorites'>
          {favorites.length > 0 ? (
            <ListPlaces places={favorites} toFormat toFavorite />
          ) : (
            <SubTitle fontSize='1rem'>No tienes favoritos</SubTitle>
          )}
        </div>
      </div>
      <div className='location__map'>
        <h2 className='location__title'>Tu ubicación</h2>
        <Location />
      </div>
    </>
  );
};
