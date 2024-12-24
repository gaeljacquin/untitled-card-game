import * as dotenv from 'dotenv';

dotenv.config();

const clientUrl = process.env.CLIENT_URL;
const allowedOrigins = [clientUrl];

const cors = {
  origin: (origin, callback) => {
    if (
      allowedOrigins.some((allowedOrigin) => {
        return allowedOrigin === origin;
      })
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
};

export default cors;
