import logger from './logger';

const requestLogger = (req, res, next) => {
  logger.info('--------------');
  logger.info('Method: ', req.method);
  logger.info('Path: ', req.path);
  logger.info('Status: ', req.status);
  logger.info('Body: ', req.body);
  next();
};

export default requestLogger;
