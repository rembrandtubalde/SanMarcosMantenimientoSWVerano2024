/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';

import { ListPlaces } from '../../components/ListPlaces';
import { Map } from '../../components/Map';
import { Input } from '../../components/Input';

import { Title, Paragraph, SubTitle } from '../../styled-components/Text';

import {
  Container,
  Texts,
  SearchAutocomplete,
  SearchMap,
  List,
  ListResults
} from './Search.styled';

export const Search = () => {
  const [places, setPlaces] = useState([]);
  const [autocomplete, setAutocomplete] = useState(null);
  const [service, setService] = useState(null);
  const [searched, setSearched] = useState({});

  const [coordinates, setCoordinates] = useState({});

  const onLoad = (autocomplete) => setAutocomplete(autocomplete);

  const onPlaceChanged = () => {
    const place = autocomplete.getPlace();
    setSearched(place);
    setCoordinates({
      lat: place.geometry?.location.lat(),
      lng: place.geometry?.location.lng()
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    });
  }, []);

  return (
    <>
      <Container>
        <SearchAutocomplete
          onLoad={onLoad}
          onPlaceChanged={onPlaceChanged}
        >
          <Input placeholder='Buscar' />
        </SearchAutocomplete>

        <Texts>
          <Title bold marginBottom='12px'>Selecciona un Punto de Referencia</Title>
          <Paragraph>Esto nos ayudará a recomendarte lugares cercanos a tu zona de referencia</Paragraph>
        </Texts>

        <SearchMap>
          <Map
            coordinates={coordinates}
            setService={setService}
            service={service}
            places={places}
            setPlaces={setPlaces}
            searched={searched}
          />
        </SearchMap>
      </Container>
      <List>
        <Title bold marginBottom='2rem'>Resultados</Title>
        <ListResults>
          {places.length
            ? <ListPlaces places={places} toFormat toFavorite route={''}/>
            : <SubTitle fontSize='16px'>Aún no has buscado un lugar</SubTitle>}
        </ListResults>
      </List>
    </>
  );
};