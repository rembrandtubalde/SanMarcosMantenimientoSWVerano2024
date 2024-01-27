/* eslint-disable camelcase */
/* eslint-disable consistent-return */
import axios from 'axios';

const GOOGLE_URL = 'https://maps.googleapis.com/maps/api/place';
const { GOOGLE_API_KEY } = process.env;

export default class PlaceController {
  static async apiGetPlaceInfo(req, res, next) {
    try {
      const { placeId } = req.query;
      const url = `${GOOGLE_URL}/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}`;

      const response = await axios.get(url);
      const { result: place } = response.data;

      const formattedPlace = {
        place: place.place_id,
        name: place.name,
        latitude: place.geometry.location.lat,
        phone_number: place.formatted_phone_number,
        longitude: place.geometry.location.lng,
        reviews: place.reviews,
        photos: place.photos,
        rating: place.rating,
        url_google_maps: place.url,
        website: place.website,
        address: place.formatted_address,
      };

      // console.log(placeData.data);

      return res.status(200).send({
        status: 'success',
        data: formattedPlace,
      });
    } catch (error) {
      next(error);
    }
  }
}
