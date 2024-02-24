/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import useToggle from '../../hooks/useToggle';
import { addFavorite, removeFavorite } from '../../redux/state/favsSlice';
import { getPlaceInfo } from '../../services/api/places';

import { SubTitle } from '../../styled-components/Text';
import * as Card from './Placecard.styled';

const QualifyImage = ({ place, toFavorite, fixed, route }) => {
  const { name, rating, photos } = place;
  const thumbnail = typeof photos?.[0]?.getUrl === 'function'
    ? photos[0].getUrl({ maxWidth: 200, maxHeight: 200 })
    : `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photos?.[0]?.photo_reference}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
  const dispatch = useDispatch();
  const [placeInfo, setPlaceInfo] = React.useState({});

  const path = route + (place.place_id ? place.place_id : place.place);

  const { newState, handleToggle } = useToggle(false);
  const { id } = useSelector((state) => state.auth.user);

  React.useEffect(() => {
    getPlaceInfo(place.place_id).then((data) => {
      setPlaceInfo(data.data);
    }).catch((err) => {
      console.log(err);
    });
  }, [place.place_id]);

  const handleClick = async () => {
    handleToggle();

    if (newState) {
      alert('Lugar eliminado de favoritos');
      await dispatch(removeFavorite(place.place_id));
    } else {
      const obj = {
        data: placeInfo,
        userId: id
      };
      await dispatch(addFavorite(obj));
      alert('Lugar agregado a favoritos');
    }
  };

  return (
    <Card.Wrapper>
      <Card.Container fixed={fixed} >
        {toFavorite && (
          <Card.FavButton onClick={handleClick} >
            {
              newState
                ? <i className="fa-solid fa-heart"></i>
                : <i className="fa-regular fa-heart"></i>
            }
          </Card.FavButton>
        )}
        <Card.Image src={thumbnail} />
        <Card.Info>
          <SubTitle fontSize='22px'>{name}</SubTitle>
          <Card.Score>
            <Card.Rating>
              <i className='fa-solid fa-star'></i>
            </Card.Rating>
            <SubTitle fontSize='22px'>{rating}</SubTitle>
          </Card.Score>
        </Card.Info>
        <Card.SelectButton className='btn-seleccionar' to={path}>
          Ver Detalles
        </Card.SelectButton>
      </Card.Container>
    </Card.Wrapper>
  );
};

export default QualifyImage;

QualifyImage.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
  toFavorite: PropTypes.bool,
  type: PropTypes.string,
  place: PropTypes.object,
  fixed: PropTypes.bool,
  route: PropTypes.string,
};


