/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { getAllMyDates, getPlaceInfo, deleteMyDate } from '../../services/api/places';

import { Button } from '../../styled-components/Button';

import * as ScheduleStyled from './Schedule.styled';
import { SubTitle, Title } from '../../styled-components/Text';

const Card = ({ date }) => {
  const [place, setPlace] = useState(null);
  const bgColors = {
    pareja: 'var(--yellow)',
    familia: 'var(--error-red)',
    amigos: 'var(--sunray)',
  };

  useEffect(() => {
    getPlaceInfo(date.place_id)
      .then(res => {
        setPlace(res.data);
      })
      .catch(err => console.log(err));
  } , [date]);

  const placePhoto = place?.photos?.[0]?.photo_reference;
  const placePhotoUrl = placePhoto
    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${placePhoto}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
    : null;

  const handleDelete = () => {
    deleteMyDate(date.id)
      .then(res => {
        console.log(res);
      }).catch(err => console.log(err));
  };

  return (
    <ScheduleStyled.Container>
      <ScheduleStyled.Thumbnail src={placePhotoUrl}>
        <ScheduleStyled.Category style={{ backgroundColor: bgColors[date.category] }}>
          {date.category.toUpperCase()}
        </ScheduleStyled.Category>
      </ScheduleStyled.Thumbnail>
      <ScheduleStyled.Body>
        <ScheduleStyled.Title>{place?.name}</ScheduleStyled.Title>
        <ScheduleStyled.Time>
          <ScheduleStyled.TimeItem>
            <i className="fa-solid fa-calendar-day"></i>
            {date.expected_date.day}
          </ScheduleStyled.TimeItem>
          <ScheduleStyled.TimeItem>
            <i className="fa-solid fa-clock"></i>
            {date.expected_date.hour}
          </ScheduleStyled.TimeItem>
        </ScheduleStyled.Time>
        <ScheduleStyled.Balance>
          <i className="fa-solid fa-sack-dollar"></i>
          Presupuesto: S/. {date.total_balance}
        </ScheduleStyled.Balance>

        <ScheduleStyled.Button>
          <Button handleClick={handleDelete} label='Cancelar Plan'>
            Cancelar Plan
          </Button>
        </ScheduleStyled.Button>
      </ScheduleStyled.Body>
    </ScheduleStyled.Container>
  );
};

export const Schedule = () => {
  const [dates, setDates] = useState([]);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    getAllMyDates(user.id).then(res => {
      setDates(res.data);
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    });
  } , []);

  return (
    <>
      <div>
        <Title marginBottom='2rem'>Mis Planes</Title>
        {dates.length
          ? dates?.map(date => (<Card key={date.id} date={date} />))
          : <SubTitle>Aún no tienes planes</SubTitle>
        }
      </div>
    </>
  );
};


Card.propTypes = {
  date: PropTypes.object,
};
