import { Schema, model } from 'mongoose';

const schema = new Schema({
  place: String,
  name: String,
  latitude: Number,
  phone_number: String,
  longitude: Number,
  reviews: [
    {
      author_name: String,
      author_url: String,
      language: String,
      profile_photo_url: String,
      rating: Number,
      relative_time_description: String,
      text: String,
      time: Number,
    },
  ],
  photos: [
    {
      height: Number,
      width: Number,
      photo_reference: String,
      html_attributions: [String],
    },
  ],
  rating: Number,
  url_google_maps: String,
  website: String,
  address: String,
});

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Favorites = model('Favs', schema);

export default Favorites;
