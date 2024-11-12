export const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).send({ status: 'error', error: 'Internal Server Error' });
};