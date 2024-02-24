/* eslint-disable no-undef */
import axios from 'axios';

const url= process.env.REACT_APP_URI_BACKEND;

export const getPlaceInfo = async (placeId) => {
  const response = await axios.get(`${url}placeinfo?placeId=${placeId}`);
  // console.log('response from axios getPlaceInfo: ', response);
  return response.data;
};

export const postNewDate = async (data) => {
  const response = await axios.post(`${url}dates`, data);
  // console.log('response from axios postNewDate: ', response);

  return response.data;
};

export const getAllMyDates = async (userId) => {
  const response = await axios.get(`${url}dates/${userId}`);
  // console.log('response from axios getAllMyDates: ', response);

  return response.data;
};

export const deleteMyDate = async (dateId) => {
  const response = await axios.delete(`${url}dates/${dateId}`);
  // console.log('response from axios deleteMyDate: ', response);

  return response.data;
};

export const getPlaces = async () => {
  const response = await axios.get(`${url}favorites`);
  // console.log('response from axios getPlaces: ', response);

  return response.data;
};

