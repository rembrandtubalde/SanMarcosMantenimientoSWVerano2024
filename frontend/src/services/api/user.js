/* eslint-disable no-undef */
import axios from 'axios';

const url= process.env.REACT_APP_URI_BACKEND;

export const updateUser = async (userId, data, config) => {
  try {
    const response = await axios.put(`${url}auth/register/${userId}`, data, config);

    return response.data;
  } catch (err) {
    console.log('err: ', err);
  }
  // console.log('response from axios updateUser: ', response);
};