/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getPlaceInfo } from '../../services/api/places';
import { useParams } from 'react-router-dom';
import { ReactPhotoCollage } from 'react-photo-collage';
import { Location } from '../../components/Location';
import * as PlaceStyled from './Place.styled';

import './index.css';
import { SubTitle, Title } from '../../styled-components/Text';
import { Score, Rating } from '../../components/QualifyImage/Placecard.styled';

const Review = ({ data }) => {
  return (
    <PlaceStyled.Review>
      <PlaceStyled.ReviewHeader>
        <PlaceStyled.ReviewAuthor>
          {data.author_name}
        </PlaceStyled.ReviewAuthor>
        <Score>
          <Rating>
            <i className='fa-solid fa-star'></i>
          </Rating>
          <SubTitle fontSize='22px' style={{ color: 'var(--dark-charcoal)'}}>{data.rating}</SubTitle>
        </Score>
      </PlaceStyled.ReviewHeader>
      <div className='review__content'>
        {data.text}
      </div>
      <PlaceStyled.ReviewTime>
        {data.relative_time_description}
      </PlaceStyled.ReviewTime>
    </PlaceStyled.Review>
  );
};

export const Place = () => {
  const { place_id } = useParams();
  const [place, setPlace] = useState({});

  const GOOGLE_URL = 'https://maps.googleapis.com/maps/api/place/photo';

  const getPhotosUrl = (photos) => {
    return photos?.map((photo) => {
      return ({
        source: `${GOOGLE_URL}?maxwidth=400&photoreference=${photo.photo_reference}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`,
      });
    });
  };

  useEffect(() => {
    getPlaceInfo(place_id)
      .then((res) => {
        setPlace(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const setting = {
    width: '900px',
    height: ['250px', '170px'],
    layout: [1, 4],
    photos: getPhotosUrl(place.photos),
    showNumOfRemainingPhotos: true,
  };

  return (
    <>
      <PlaceStyled.Container>
        <PlaceStyled.LinkStyled
          to='/inicio/buscar'
        >
          {'< Volver atras'}
        </PlaceStyled.LinkStyled>
        {place.photos?.length && (
          <PlaceStyled.CollageContainer>
            <ReactPhotoCollage {...setting} />
          </PlaceStyled.CollageContainer>
        )}
        <PlaceStyled.WrapperPlace>
          <PlaceStyled.InfoTitle>
            <Title>{place.name}</Title>
            <PlaceStyled.InfoIcon>
              <i className="fa-solid fa-link"></i>
              <a href={place.website} target='_blank' rel='noreferrer'>{place.website}</a>
            </PlaceStyled.InfoIcon>
          </PlaceStyled.InfoTitle>
          <PlaceStyled.InfoContact>
            <SubTitle fontSize='1rem'>{place.address}</SubTitle>
            <PlaceStyled.InfoPhone>
              <i className="fa-solid fa-phone"></i>
              <SubTitle fontSize='1rem'>{place.phone_number}</SubTitle>
            </PlaceStyled.InfoPhone>
          </PlaceStyled.InfoContact>
          <PlaceStyled.InfoUrl>
            <SubTitle fontSize='1rem'>También puedes buscar el lugar en{' '}</SubTitle>
            <a
              href={place.url_google_maps} target='_blank' rel='noreferrer'
            >
              google maps
            </a>
          </PlaceStyled.InfoUrl>

          <Title marginBottom='2rem'>Reseñas</Title>
          <PlaceStyled.ReviewsContainer>
            {place.reviews?.map((review, idx) => {
              return review.text && (
                <Review data={review} key={idx}/>
              );
            })}
          </PlaceStyled.ReviewsContainer>
          <PlaceStyled.LinkContainer>
            <Link className="button link" to={`/inicio/crear-plan/${place_id}`}>Crear plan</Link>
          </PlaceStyled.LinkContainer>
        </PlaceStyled.WrapperPlace>
      </PlaceStyled.Container>
      <div className='location__map'>
        <Title marginBottom='2rem'>Tu ubicación</Title>
        <Location />
      </div>
    </>
  );
};

Review.propTypes = {
  data: PropTypes.object,
};