/* eslint-disable func-names */
import { Schema, model } from 'mongoose';

const schema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  category: {
    type: String,
    enum: ['familia', 'pareja', 'amigos'],
    required: [true, 'Elija una categoría por favor'],
  },
  budget: [
    {
      description: {
        type: String,
        required: [true, 'Debes agregar una descripción'],
        trim: true,
      },
      balance: {
        type: Number,
        required: [true, 'Debes agregar un monto'],
      },
    },
  ],
  place_id: String,
  expected_date: {
    hour: String,
    day: String,
  },
});

schema.set('toObject', { virtuals: true });

schema.set('toJSON', {
  virtuals: true,
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

schema.virtual('total_balance').get(function () {
  return this.budget.reduce((total, budget) => total + budget.balance, 0);
});

schema.virtual('full_expected_date').get(function () {
  return `${this.expected_date.day} ${this.expected_date.hour}`;
});

const Date = model('Date', schema);

export default Date;
