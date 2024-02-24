import axios from 'axios';

// eslint-disable-next-line no-undef
let url = process.env.REACT_APP_URI_BACKEND;

const getFavorites = async (userId) => {
  const finalUrl = url + 'favorites/' + userId;

  return axios
    .get(finalUrl)
    .then((res) => {
      console.log('from fav service ', res.data.data[0].favorites);
      return res.data.data[0].favorites;
    });
};

const addToFavorites = async (userId, placeInfo) => {
  const finalUrl = url + 'favorites';
  const data = {
    place: placeInfo,
    userId: userId,
  };

  return axios
    .post(finalUrl, data)
    .then((res) => {
      return res.data;
    });
};

const deleteFromFavorites = async (id) => {
  const finalUrl = url + 'favorites/' + id;

  return axios
    .delete(finalUrl)
    .then((res) => {
      return res.data;
    });
};

const favsService = {
  getFavorites,
  addToFavorites,
  deleteFromFavorites
};

export default favsService;
