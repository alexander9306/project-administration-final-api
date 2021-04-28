export const configuration = {
  port: parseInt(process.env.PORT, 10) || 3000,
  env: process.env.NODE_ENV,
  database: {
    uri: process.env.MONGO_URL,
    uri_prod:
      process.env.MONGO_URL_PROD ||
      'mongodb+srv://alex2456:rHXzeryKveXdd19G@cluster0.5twkm.mongodb.net/adminDB?retryWrites=true&w=majority',
  },
  isProduction() {
    return process.env.NODE_ENV === 'production';
  },
};
