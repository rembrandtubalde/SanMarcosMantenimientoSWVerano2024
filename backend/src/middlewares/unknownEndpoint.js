const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'this page can´t be found' });
};

export default unknownEndpoint;
