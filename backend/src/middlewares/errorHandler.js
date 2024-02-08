/* eslint-disable no-else-return */

const handleValidationError = (err, res) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const fields = Object.values(err.errors).map((el) => el.path);
  const code = 400;

  if (errors.length > 1) {
    const formattedErrors = errors.join('-');

    res.status(code).json({ messages: formattedErrors, fields });
  } else {
    res.status(code).json({ messages: errors, fields });
  }
};

const handleDuplicateKeyError = (err, res) => {
  const field = Object.keys(err.keyValue);
  const code = 409;
  const errorMessage = `Una cuenta con este ${field} ya existe.`;

  res.status(code).json({ messages: errorMessage, fields: field });
};

// eslint-disable-next-line consistent-return
const errorHandler = (error, req, res, next) => {
  try {
    if (error.message === 'CastError') {
      return res.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
      return handleValidationError(error, res);
    } else if (error.code && error.code === 11000) {
      return handleDuplicateKeyError(error, res);
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'invalid token' });
    } else if (error.message === 'invalidUser') {
      return res.status(400).send({
        messages: 'Usuario no encontrado',
        fields: ['email'],
      });
    } else if (error.message === 'invalidPassword') {
      return res.status(400).send({
        messages: 'La contraseña es incorrecta',
        fields: ['password'],
      });
    }
  // eslint-disable-next-line no-shadow
  } catch (error) {
    res.status(500).json({ message: 'An unknown error ocurred', error: error.message });
  }

  next(error);
};

export default errorHandler;
